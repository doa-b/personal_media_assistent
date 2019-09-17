import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './AddSeries.module.css'
import {updateObject} from '../../../shared/utility';
import * as actions from '../../../store/actions';
// import SeriesDetailsMain from '../../Series/SeriesDetails/SeriesDetailsMain'
import SeriesDetailsMain from '../../../components/Series/SeriesDetails/SeriesDetailsMain'
import WithModal from '../../../hoc/withModal/withModal'
import axios from "../../../axios/tvdbAxios";
import * as keys from "../../../kluis";
import Spinner from '../../../components/UI/Spinner/Spinner'
import {findSeriesSucces, tmdbFail} from "../../../store/actions/seriesActions";


/**
 * Created by Doa on 16-9-2019.
 */
class AddSeries extends Component {
    state = {
        query: '',
        results: [],
        seriesDetails: null,
        showDetails: false,
        loading: false,
        error: null
    };

    changeHandler = (event) => {
        this.setState(updateObject(this.state, {query: event.target.value}))
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        axios.get('/search/tv', {
            params: {
                api_key: keys.TMDB_SLEUTEL,
                query: this.state.query
            }
        })
            .then((response) => {
                console.log(response.data.results);
                this.setState({
                    results: response.data.results,
                    loading: false
                })
            })
            .catch((err) => {
                this.setState({
                    error: err,
                    loading: false
                })
            })
    };
    //this.props.onFind(this.state.query)

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

    addSeriesHandler = (id) => {
        this.props.onAddSeries(id);
        this.props.history.push('/');
    };

    hideDetailsHandler = () => {
        this.setState({showDetails: false})
    };

    render() {

        console.log(this.props.results);
        let table = null;
        let modal = null;
        let loading = (this.state.loading) ? <Spinner/> : null

        if (this.state.results.length > 0) {
            table = (
                <table>
                    <tbody>
                    <tr>
                        <th>First Aired</th>
                        <th>name</th>
                    </tr>
                    {this.state.results.map((result) => {
                        return (
                            <tr key={result.id}>
                                <td> {result.first_air_date} </td>
                                <td onClick={() => this.showDetailsHandler(result.id)}> {result.name} </td>
                                <td>
                                    <button onClick={()=> this.addSeriesHandler(result.id)}>Add</button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            );
        }

        modal = (
            <WithModal show={this.state.showDetails}
                       modalClosed={this.hideDetailsHandler}>
                <SeriesDetailsMain details={this.state.seriesDetails}/>
            </WithModal>);


        return (<div>
            {loading}
            {(this.state.seriesDetails) ? modal : null}
            <form onSubmit={this.submitHandler}>
                <input type='text'
                       value={this.state.query}
                       onChange={this.changeHandler}/>
                <button type='submit'>
                    Submit
                </button>
            </form>
            {table}
        </div>);
    }
}

const mapStatetoProps = (state) => {
    return {
        results: state.series.results
    }
};

const mapDispatchtoProps = (dispatch) => {
    return {
        onFind: (query) => dispatch(actions.findSeries(query)),
        onAddSeries: (seriesId) => dispatch(actions.addSeries(seriesId))
    };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(AddSeries);