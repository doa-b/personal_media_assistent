import React, {Component} from 'react';
import {connect} from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import classes from './SeriesList.module.css'
import SeriesListItem from '../../components/SeriesListItem/SeriesListItem'
import Aux from '../../hoc/Auxiliary/Auxiliary'

/**
 * Created by Doa on 9-9-2019.
 */
class SeriesList extends Component {

    render() {

        let searchbar = null;
        let filterBar = null;
        let order = null;

        if (this.props.search) {
            searchbar = (
                <div className={classes.searchBar}
                     onClick={this.props.onSearch}>
                    <div>
                    <b>search: </b>{this.props.search}
                    </div>
                    <FontAwesomeIcon
                        className={classes.closeIcon}
                        icon={'times-circle'}/>
                </div>
            )
        }

        if (this.props.filter) {
            filterBar = (
                <div className={classes.filterBar}
                     onClick={this.props.onSearch}>
                    <div>
                        <b>filter: </b>{this.props.filter}
                    </div>
                    <FontAwesomeIcon
                        className={classes.sortIcon}
                        icon={'sort-up'}/>
                </div>
            )
        }

        return (
            <Aux>
                {searchbar}
                {filterBar}
                {this.props.seriesList.map((series) =>
                    <div className={classes.SeriesList}
                         key={series.id}>
                        <SeriesListItem
                            series={series}/>
                    </div>)}
            </Aux>)
    }
}

const mapStateToProps = (state) => {
    return {
        seriesList: state.series,
        search: state.search,
        filter: state.filter,
        Order: state.order
    }
};

export default connect(mapStateToProps)(SeriesList);