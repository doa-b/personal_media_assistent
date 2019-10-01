import React, {Component} from 'react';
import {connect} from 'react-redux'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import classes from './SeriesList.module.css'
import SeriesListItem from '../../../components/Series/SeriesListItem/SeriesListItem'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import * as actions from "../../../store/actions/index";
import WithModal from '../../../hoc/withModal/withModal';
import ListPicker from '../../../components/UI/Input/ListPicker';
import {updateObject, compareValues, filterByValue} from '../../../shared/utility';

/**
 * Created by Doa on 9-9-2019.
 */
class SeriesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pickOption: null,
            orderIcon: 'sort-up',
            search: '',
            filteredSeriesList: []
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

    setOptionHandler = (option) => {
        this.setState({pickOption: option});
    };

    closeModalHandler = () => {
        this.setState({pickOption: null});
        console.log(this.state);
    };

    saveOptions = (element, value) => {
        const newOptions = updateObject(this.props.options, {[element]: value});
        this.setState({pickOption: null});
        this.props.onSaveOptions(this.props.idToken, this.props.userId, newOptions)
    };

    toggleOrderHandler = () => {
        console.log('change order');
        let order;
        if (this.props.options.order === 'ascending') {
            order = 'descending';
            this.setState({orderIcon: 'sort-down'})
        } else {
            order = 'ascending';
            this.setState({orderIcon: 'sort-up'})
        }
        this.saveOptions('order', order)
    };

    searchHandler = (e) => {
        this.setState({search: e.target.value})
        console.log(this.state);
    };

    clearSearchHandler = () => {
        this.setState({search: ''})
    };

    render() {
        let searchBar = null;
        let filterBar = null;
        let sortBar = null;
        let filteredSeriesList = this.props.seriesList;
        if (this.state.search !== '') {
            filteredSeriesList = filterByValue(filteredSeriesList,'name', this.state.search)
        }
        if (this.props.options.filter !=='none') {
            filteredSeriesList = filteredSeriesList.filter(element => element.myStatus === this.props.options.filter);
        }
        if (this.props.options.sortBy === 'last seen') {
        filteredSeriesList.sort(compareValues('lastSeen', this.props.options.order));
        } else if (this.props.options.sortBy === 'name') {
            filteredSeriesList.sort(compareValues('name', this.props.options.order));
        }

            searchBar = (
                <div className={classes.searchBar}>
                    <div>
                        <label><b>search</b>:
                        <input value={this.state.search}
                        onChange={this.searchHandler}/>
                        </label>
                    </div>
                    <div onClick={this.clearSearchHandler}>
                    <FontAwesomeIcon
                        className={classes.closeIcon}
                        icon={'times-circle'}/>
                    </div>
                </div>
            );


        if (this.props.options.filter) {
            filterBar = (
                <div className={classes.filterBar}
                     onClick={() => this.setOptionHandler('filter')}>
                    <b>filter: </b>{this.props.options.filter}
                </div>
            )
        }

        if (this.props.options.sortBy) {
            sortBar = (
                <div className={classes.sortBar}>
                    <div onClick={() => this.setOptionHandler('sortBy')}>
                        <b>sort by: </b>{this.props.options.sortBy}
                    </div>
                    <div onClick={this.toggleOrderHandler}>
                        <FontAwesomeIcon
                            className={classes.sortIcon}
                            icon={this.state.orderIcon}/>
                    </div>
                </div>
            )
        }

        return (
            <Aux>
                {this.props.loading ? <p>loading</p> : null}
                <WithModal show ={(this.state.pickOption!=null)}
                           modalClosed={this.closeModalHandler}>
                    <ListPicker choices={this.state.pickOption}
                                chosen={this.saveOptions}/>
                </WithModal>
                {searchBar}
                {filterBar}
                {sortBar}
                {filteredSeriesList.map((series) =>
                    <div className={classes.SeriesList}
                         key={series.id}
                         onClick={() => this.showDetailsHandler(series)}>
                        <SeriesListItem
                            series={series}/>
                    </div>)}
            </Aux>)
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId,
        idToken: state.auth.idToken,
        seriesList: state.mySeries.series,
        options: state.mySeries.options,
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