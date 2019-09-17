import React, {Component} from 'react';
import {connect} from 'react-redux'

import classes from './SeriesDetails.module.css'
import * as actions from "../../../store/actions";

/**
 * Created by Doa on 17-9-2019.
 */
class SeriesDetails extends Component {

    render() {
        console.log(this.props.location.state)

        return (<div>
            <p>SeriesDetails</p>
            <button onClick={()=> this.props.onGetEpisodeDetails(
                1405,
                this.props.location.state.season,
                this.props.location.state.episode
                )}>load details</button>
        </div>);

    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        onGetEpisodeDetails: (seriesId, season, episode) =>
            dispatch(actions.getEpisodeDetails(seriesId, season, episode))
    };
};

export default connect(null, mapDispatchtoProps)(SeriesDetails);