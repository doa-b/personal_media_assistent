import React, {Component} from 'react';
import {connect} from 'react-redux'

import classes from './SeriesList.module.css'
import SeriesListItem from '../../../components/Series/SeriesListItem/SeriesListItem'
import * as actions from "../../../store/actions/index";
import WithModal from '../../../hoc/withModal/withModal';
import ListPicker from '../../../components/UI/Input/ListPicker';
import {updateObject, compareValues, filterByValue} from '../../../shared/utility';
import SearchBar from '../../../components/UI/SearchBar/SearchBar'
import FilterBar from '../../../components/UI/FilterBar/FilterBar'
import SortBar from '../../../components/UI/SortBar/SortBar'

/**
 * Created by Doa on 9-9-2019.
 */
class SeriesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pickOption: null,
            orderIcon: 'sort-up',
            search: ''
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
                stored: true
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
        this.setState({search: e.target.value});
        console.log(this.state);
    };

    clearSearchHandler = () => {
        this.setState({search: ''})
    };

    render() {
        let filteredSeriesList = this.props.seriesList;
        if (this.props.options) {
            if (this.state.search !== '') {
                filteredSeriesList = filterByValue(filteredSeriesList, 'name', this.state.search)
            }
            if (this.props.options.filter !== 'none') {
                filteredSeriesList = filteredSeriesList.filter(element => element.myStatus === this.props.options.filter);
            }
            if (this.props.options.sortBy === 'last seen') {
                filteredSeriesList.sort(compareValues('lastSeen', this.props.options.order));
            } else if (this.props.options.sortBy === 'name') {
                filteredSeriesList.sort(compareValues('name', this.props.options.order));
            }
        }

        return (
            <>
                {this.props.loading ? <p>loading</p> : null}
                <WithModal show={(this.state.pickOption != null)}
                           modalClosed={this.closeModalHandler}>
                    <ListPicker choices={this.state.pickOption}
                                chosen={this.saveOptions}/>
                </WithModal>
                <SearchBar
                    search={this.state.search}
                    setSearch={(event) => this.searchHandler(event)}
                    clearSearch={this.clearSearchHandler}
                />
                <FilterBar
                    setOption={this.setOptionHandler}
                    filter={this.props.options.filter}
                />
                <SortBar
                    sortBy={this.props.options.sortBy}
                    setOption={this.setOptionHandler}
                    toggleOrder={this.toggleOrderHandler}
                    orderIcon={this.state.orderIcon}
                />

                {filteredSeriesList.map((series, index) =>
                    <div className={classes.SeriesList}
                         key={index}
                         onClick={() => this.showDetailsHandler(series)}>
                        <SeriesListItem
                            series={series}/>
                    </div>)}
            </>)
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