import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './AddSeries.module.css'
import {updateObject} from '../../../shared/utility';
import * as actions from '../../../store/actions';
import Spinner from '../../../components/UI/Spinner/Spinner'

//TODO store search query after submit in options Store, and load on mount, so we can go back to this page

/**
 * Created by Doa on 16-9-2019.
 */
class AddSeries extends Component {
    state = {
        query: ''
    };

    changeHandler = (event) => {
        this.setState(updateObject(this.state, {query: event.target.value}))
    };

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onFind(this.state.query);
    };

    showDetailsHandler = (id) => {
        this.props.history.push({
            pathname: '/details',
            state: {
                seriesId: id,
                season: 1,
                episode: 1,
            }
        })
    };

    render() {
        console.log(this.props.results);
        let table = null;
        let loading = (this.props.loading) ? <Spinner/> : null;

        if (this.props.results.length > 0) {
            table = (
                <table>
                    <tbody>
                    <tr>
                        <th>First Aired</th>
                        <th>name</th>
                    </tr>
                    {this.props.results.map((result) => {
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

        return (<div>
            {loading}
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
        results: state.series.results,
        loading: state.series.loading,
        error: state.series.error
    }
};

const mapDispatchtoProps = (dispatch) => {
    return {
        onFind: (query) => dispatch(actions.findSeries(query))
    };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(AddSeries);