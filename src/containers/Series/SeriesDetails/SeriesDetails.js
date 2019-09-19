import React, {Component} from 'react';
import {connect} from 'react-redux'

import classes from './SeriesDetails.module.css'
import * as actions from "../../../store/actions";
import axios from "../../../axios/tvdbAxios";
import * as keys from "../../../kluis";
import SeriesDetailsMain from "../../../components/Series/SeriesDetails/SeriesDetailsMain";
import Spinner from '../../../components/UI/Spinner/Spinner'

/**
 * Created by Doa on 17-9-2019.
 */
class SeriesDetails extends Component {
    state = {
        seriesId: 0,
        season: 0,
        episode: 0,
        firebaseId: null,

        seriesDetails: null,
        showDetails: false,
    };

    componentWillMount() {
        this.setState({
            seriesId: this.props.location.state.seriesId,
            season: this.props.location.state.season,
            episode: this.props.location.state.episode
        });
    }

    componentDidMount() {
        this.props.onFetchSeriesDetails(this.state.seriesId);
        this.props.onFetchEpisodeDetails(
            this.state.seriesId,
            this.state.season,
            this.state.episode
        );
    }

    showState = () => {
        console.log(this.props.series);
        console.log(this.props.episode)
    };

    backToList = () => {
        this.props.history.goBack();
    };

    saveSeries = () => {
        const s = this.props.series;
        let nextAirDate = (s.next_episode_to_air) ? s.next_episode_to_air.air_date : "none"
        const seriesData = {
            name: s.name,
            status: s.status,
            nextAirDate: nextAirDate,
            seriesId: this.state.seriesId,
            season: this.state.season,
            seasonTotal: s.number_of_seasons,
            episodeTotal: s.seasons[this.state.season].episode_count,
            episode: this.state.episode,
            episodeTitle: this.props.episode.name,
            image: this.props.episode.still_path
        };
        this.props.onSaveSeries(this.props.idToken, this.props.userId, seriesData)
    };

    // kan weg
    saveOptions = () => {
        const seriesData = {
            filter: 'kippen',
            search: 'doa',
            order: 'ascending'
        };
        this.props.onSaveOptions(this.props.idToken, this.props.userId, seriesData)
    };

    render() {
        console.log(this.state);

        return (<div>
            <p onClick={this.backToList}>back to list</p>
            {(this.props.series) ? <SeriesDetailsMain details={this.props.series}/> : <Spinner/>}

            <p>EpisodeDetails</p>
            <button onClick={this.showState}>load details</button>
            <button onClick={this.saveSeries}>Save</button>
            <button onClick={this.saveOptions}>Save Options</button>
        </div>);

    }
}

const mapStateToProps = (state) => {
    return {
        series: state.series.seriesDetails,
        episode: state.series.episodeDetails,
        userId: state.auth.userId,
        idToken: state.auth.idToken
    }
};

const mapDispatchtoProps = (dispatch) => {
    return {
        onFetchSeriesDetails: (seriesId) =>
            dispatch(actions.fetchSeriesDetails(seriesId)),

        onFetchEpisodeDetails: (seriesId, season, episode) =>
            dispatch(actions.fetchEpisodeDetails(seriesId, season, episode)),

        onSaveSeries: (token, userId, seriesData) =>
            dispatch(actions.saveMySeries(token, userId, seriesData)),

        onSaveOptions: (token, userId, options) =>
            dispatch(actions.saveMyOptions(token, userId, options))
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(SeriesDetails);