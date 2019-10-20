import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

import './App.css';
import asyncComponent from './hoc/asyncComponent/asyncComponent'
import * as actions from "./store/actions";
import Layout from './hoc/Layout/Layout';
import Register from './containers/Authentication/Authentication'


const asyncAuth = asyncComponent(() => {
    return import ('./containers/Authentication/Authentication')
});

const asyncLogout = asyncComponent(() => {
    return import ('./containers/Authentication/Logout/Logout')
});

const asyncSeriesList = asyncComponent(() => {
    return import ('./containers/Series/SeriesList/SeriesList')
});

const asyncAddSeries = asyncComponent(() => {
    return import ('./containers/Series/AddSeries/AddSeries')
});

const asyncSeriesDetails = asyncComponent(() => {
    return import ('./containers/Series/SeriesDetails/SeriesDetails')
});



class App extends Component {

    componentDidMount () {
        this.props.onTryAutoSignup();
    }

    render() {

        let routes = (
            <Switch>
                <Route path="/auth" component={asyncAuth}/>
                <Redirect to="/auth"/>
            </Switch>
        );

        if (this.props.isAuthenticated) routes = (
            <Switch>
                <Route path="/series/add" exact component={asyncAddSeries} />
                <Route path="/" exact component={asyncSeriesList} />
                <Route path="/authentication" exact component={asyncAuth} />
                <Route path="/logout" exact component={asyncLogout}/>
                <Route path="/details" exact component={asyncSeriesDetails}/>
                <Redirect to="/"/>
            </Switch>
        );
        return (
            <div>
                <Layout>
                    {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.idToken !=null
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
