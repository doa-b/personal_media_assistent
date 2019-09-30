import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css';

import * as actions from "./store/actions";
import Layout from './hoc/Layout/Layout'
import SeriesList from './containers/SeriesList/SeriesList'
import Authentication from './containers/Authentication/Authentication'
import Logout from './containers/Authentication/Logout/Logout'
import AddSeries from './containers/Series/AddSeries/AddSeries'
import SeriesDetails from './containers/Series/SeriesDetails/SeriesDetails'

class App extends Component {

    componentDidMount () {
        this.props.onTryAutoSignup();
    }

    render() {

        let routes = (
            <Switch>
                <Route path="/auth" component={Authentication}/>
                <Redirect to="/auth"/>
            </Switch>
        );

        if (this.props.isAuthenticated) routes = (
            <Switch>
                <Route path="/series/add" exact component={AddSeries} />
                <Route path="/" exact component={SeriesList} />
                <Route path="/authentication" exact component={Authentication} />
                <Route path="/logout" exact component={Logout}/>
                <Route path="/details" exact component={SeriesDetails}/>
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
