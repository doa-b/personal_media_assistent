import React, {Component} from 'react';
import { connect } from 'react-redux'

import classes from './SeriesList.module.css'
import SeriesListItem from '../../components/SeriesListItem/SeriesListItem'
/**
 * Created by Doa on 9-9-2019.
 */
class SeriesList extends Component {

    render() {

        return (
            this.props.seriesList.map((series) =>
            <div className={classes.SeriesList}
            key={series.id}>
            <SeriesListItem
            series={series}/>
        </div>));

    }
}

const mapStateToProps = (state) => {
    return {
        seriesList: state.series
    }
};

export default connect(mapStateToProps)(SeriesList);