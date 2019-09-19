import React, {Component} from 'react';
import {connect} from 'react-redux'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import classes from './SeriesList.module.css'
import SeriesListItem from '../../components/SeriesListItem/SeriesListItem'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import * as actions from "../../store/actions";

/**
 * Created by Doa on 9-9-2019.
 */
class SeriesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        this.props.onTryAutoSignup();
        this.props.onFetchMyData();
}

    showDetailsHandler = (mySeries) => {
        this.props.history.push({
            pathname: '/details',
            state: {
                seriesId: mySeries.id,
                season: mySeries.season,
                episode: mySeries.episode,
            }
        })
    };

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
                {this.props.loading?<p>loading</p>: null}
                {searchbar}
                {filterBar}
                {this.props.seriesList.map((series) =>
                    <div className={classes.SeriesList}
                         key={series.id}
                         onClick={()=> this.showDetailsHandler(series)}>
                        <SeriesListItem
                            series={series}/>
                    </div>)}
                    <button onClick={this.props.onFetchMyData}>Fetch my Data</button>
            </Aux>)
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        idToken: state.auth.idToken,
        seriesList: state.mySeries.series,
        search: state.mySeries.options.search,
        filter: state.mySeries.options.filter,
        order: state.mySeries.options.order,
        loading: state.mySeries.loading
    }
};

const mapDispatchtoProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState()),

        onSaveSeries: (token, userId, seriesData) =>
            dispatch(actions.saveMySeries(token, userId, seriesData)),

        onSaveOptions: (token, userId, options) =>
            dispatch(actions.saveMyOptions(token, userId, options)),

        onFetchMyData: (token, userId) =>
            dispatch(actions.fetchMyData(token, userId))
    };
};


export default connect(mapStateToProps, mapDispatchtoProps)(SeriesList);