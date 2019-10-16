import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './AddSeries.module.css'
import {updateObject} from '../../../shared/utility';
import * as actions from '../../../store/actions';
import Spinner from '../../../components/UI/Spinner/Spinner'

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
                episode: 1
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
                        <th>First air date </th>
                        <th>Name</th>
                    </tr>
                    {this.props.results.map((result) => {
                        return (
                            <tr key={result.id}>
                                <td> {result.first_air_date} </td>
                                <td onClick={() => this.showDetailsHandler(result.id)}><u> {result.name}</u></td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            );
        }

        return (
            <div className={classes.AddSeries}>
                {loading}
                <form onSubmit={this.submitHandler}>

                    <input type='text'
                           value={this.state.query}
                           placeholder='enter series title'
                           onChange={this.changeHandler}/>
                    <button type='submit'>
                        Search
                    </button>
                </form>
                <br/>
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