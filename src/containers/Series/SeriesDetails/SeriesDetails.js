import React, {Component} from 'react';
import {connect} from 'react-redux'

import classes from './SeriesDetails.module.css'
import * as actions from "../../../store/actions";

import SeriesDetailsMain from "../../../components/Series/SeriesDetails/SeriesDetailsMain";
import EpisodeDetails from '../../../components/Series/EpisodeDetails/EpisodeDetails'
import Spinner from '../../../components/UI/Spinner/Spinner'
import NumberPicker from '../../../components/UI/Input/NumberPicker'
import WithModal from "../../../hoc/withModal/withModal";
import {getSeriesStatus} from '../../../shared/utility'


/**
 * Created by Doa on 17-9-2019.
 */
class SeriesDetails extends Component {
    state = {
        seriesId: 0,
        season: 0,
        episode: 0,
        firebaseId: null,
        picker: null,

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

    componentDidUpdate(prevProps, prevState) {
        if (this.state.episode !== prevState.episode || this.state.season !== prevState.season) {
            this.props.onFetchEpisodeDetails(
                this.state.seriesId,
                this.state.season,
                this.state.episode)
        }
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
        let nextAirDate = (s.next_episode_to_air) ? s.next_episode_to_air.air_date : 'none';
        const seriesData = {
            name: s.name,
            status: s.status,
            myStatus: getSeriesStatus(this.props.series, this.state.season * this.state.episode),
            lastSeen: new Date(),
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

    setValue = (value) => {
        if (this.state.picker === 'season') {
            this.setState({season: value, episode: 1})
        } else {
            this.setState({episode: value});
        }
        this.closeModalHandler();
    };

    changeNumberHandler = (name) => {
        this.setState({picker: name})
    };

    closeModalHandler = () => {
        this.setState({picker: null})
    };

    render() {
        console.log(this.state);
        let picker = null;
        let max = 0;

        if (this.state.picker) {
            if (this.state.picker === 'episode') {
                max = (this.props.series.seasons[this.state.season].episode_count) ?
                    this.props.series.seasons[this.state.season].episode_count : 1;
            }
            else {
                max = this.props.series.number_of_seasons;
            }
            picker = (
                <WithModal show modalClosed={this.closeModalHandler}>
                    <NumberPicker name={this.state.picker}
                                  current={this.state[this.state.picker]}
                                  max={max}
                                  min={0}
                                  chosen={(value) => this.setValue(value)}/>
                </WithModal>
            );
        }

        return (
            <div className={classes.SeriesDetails}>
            {picker}
            <p onClick={this.backToList}>back to list</p>
            {(this.props.series) ? <SeriesDetailsMain details={this.props.series}/> : <Spinner/>}

            <p>Next Episode to watch

            </p>
            <label>
                Season
                <span
                    className={classes.number}
                    onClick={() => this.changeNumberHandler('season')}>
                {this.state.season}</span>
            </label>
            <label>
                Episode
                <span className={classes.number}
                      onClick={() => this.changeNumberHandler('episode')}>
                {this.state.episode}</span>
            </label>
                {(this.props.episode) ? <EpisodeDetails episode={this.props.episode}/> : <Spinner/> }
            <p>
                <br/>
            <button onClick={this.showState}>load details</button>
            <button onClick={this.saveSeries}>Save</button>
            </p>
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
            dispatch(actions.saveMySeries(token, userId, seriesData))
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(SeriesDetails);