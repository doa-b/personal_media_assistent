import React, {Component} from 'react';
import {connect} from 'react-redux'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import classes from './SeriesList.module.css'
import SeriesListItem from '../../components/SeriesListItem/SeriesListItem'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import * as actions from "../../store/actions";
import WithModal from "../../hoc/withModal/withModal";
import NumberPicker from "../../components/UI/Input/NumberPicker";
import ListPicker from "../../components/UI/Input/ListPicker";
import {updateObject} from "../../shared/utility";

/**
 * Created by Doa on 9-9-2019.
 */
class SeriesList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pickOption: null,
            orderIcon: 'sort-up',
            search: null
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
        console.log(this.state);
    };

    closeModalHandler = () => {
        this.setState({pickOption: null});
        console.log(this.state);
    };

    saveOptions = (element, value) => {
    const newOptions = updateObject(this.props.options, { [element]: value} );
    this.setState ({pickOption: null});
    this.props.onSaveOptions(this.props.idToken, this.props.userId, newOptions)
};

    toggleOrderHandler = () => {
       let order;
       if (this.props.order === 'ascending') {
           order = 'descending';
           this.setState({orderIcon : 'sort-down'})
       } else {
           order = 'ascending';
           this.setState({orderIcon : 'sort-up'})
       }
       this.saveOptions('order', order)
    };

    render() {

        let searchBar = null;
        let filterBar = null;
        let sortBar = null;
        let order = null;
        let optionsPicker = null;


        switch (this.state.pickOption) {
            case 'filter': {
                const choices=[
                    'paused',
                    'available',
                    'finished',
                    'all'
                ];
                optionsPicker = (
                    <WithModal show={(this.state.pickOption===null)} modalClosed={this.closeModalHandler}>
                        <ListPicker choices={choices}
                        chosen={this.saveFilter}/>
                    </WithModal>
                );
                break;
            }

            case 'sortBy': {
                const choices=[
                    'name',
                    'next airdate',
                    'last seen',
                ];
                optionsPicker = (
                    <WithModal show modalClosed={this.closeModalHandler}>
                        <ListPicker choices={choices}
                                    chosen={this.saveSortBy}/>
                    </WithModal>
                );
                break;
            }
            default: optionsPicker = null;
        }

        if (this.props.search) {
            searchBar = (
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

        if (this.props.options.filter) {
            sortBar = (
                <div className={classes.filterBar}
                     onClick={()=> this.setOptionHandler ('filter')}>
                        <b>filter: </b>{this.props.options.filter}
                </div>
            )
        }

        if(this.props.options.sortBy) {
            filterBar = (
                <div className={classes.filterBar}>
                    <div onClick={()=> this.setOptionHandler ('sortBy')}>
                        <b>sort By: </b>{this.props.options.sortBy}
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
                {this.props.loading?<p>loading</p>: null}
                <WithModal show ={(this.state.pickOption!=null)}
                           modalClosed={this.closeModalHandler}>
                    <ListPicker choices={this.state.pickOption}
                                chosen={this.saveOptions}/>
                </WithModal>
                {searchBar}
                {sortBar}
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
        options: state.mySeries.options,
        // filter: state.mySeries.options.filter,
        // order: state.mySeries.options.order,
        // sortBy: state.mySeries.options.sortBy,
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