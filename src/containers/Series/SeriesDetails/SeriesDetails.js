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

        seriesDetails: null,
        showDetails: false,
        loading: false,
        error: null,
    };

    componentWillMount() {
        this.setState({
            seriesId: this.props.location.state.seriesId,
            season: this.props.location.state.season,
            episode: this.props.location.state.episode
        });
    }

    componentDidMount() {
        this.props.onGetEpisodeDetails(
            this.state.seriesId,
            this.state.season,
            this.state.episode
        );
        this.showDetailsHandler(this.state.seriesId)
    }

    showDetailsHandler = (id) => {
        this.setState({loading: true});
        console.log(this.state);
        axios.get(`/tv/${id}`, {
            params: {
                api_key: keys.TMDB_SLEUTEL
            }
        })
            .then((response) => {
                    console.log(this.state);
                    this.setState({
                        seriesDetails: response.data,
                        showDetails: true,
                        loading: false
                    });
                    console.log('[seriesDetails] ' + this.state)
                }
            )
            .catch((err) => {
                this.setState({
                    error: err,
                    loading: false
                })
            })
    };

    showState = () => {
        console.log(this.state);
        console.log(this.props.episodeDetails)
    };

    backToList = () => {
        this.props.history.goBack();
    };

    render() {
        console.log(this.state);

        return (<div>
            <p onClick={this.backToList}>back to list</p>
            {(this.state.seriesDetails) ? <SeriesDetailsMain details={this.state.seriesDetails}/> : <Spinner/>}
            <p>SeriesDetails</p>
            <button onClick={this.showState}>load details</button>
        </div>);

    }
}

const mapStateToProps = (state) => {
    return {
        episodeDetails: state.series.episodeDetails,
    }
};

const mapDispatchtoProps = (dispatch) => {
    return {
        onGetEpisodeDetails: (seriesId, season, episode) =>
            dispatch(actions.getEpisodeDetails(seriesId, season, episode))
    };
};

export default connect(mapStateToProps, mapDispatchtoProps)(SeriesDetails);