import React, {Component} from 'react';

import classes from './SeriesList.module.css'
import SeriesListItem from '../../components/SeriesListItem/SeriesListItem'
/**
 * Created by Doa on 9-9-2019.
 */
class SeriesList extends Component {

    render() {

        return (<div className={classes.SeriesList}>
            <SeriesListItem/>
        </div>);

    }
}

export default SeriesList;