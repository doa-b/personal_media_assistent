import React, {Component} from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import './App.css';

import * as actions from "./store/actions";
import Layout from './hoc/Layout/Layout'
import SeriesList from './containers/SeriesList/SeriesList'
import Authentication from './containers/Authentication/Authentication'
import Logout from './containers/Authentication/Logout/Logout'

class App extends Component {

    componentDidMount () {
        this.props.onTryAutoSignup();
    }

    render() {

        let routes = (
            <Switch>
                <Route path="/" exact component={SeriesList} />
                <Route path="/authentication" exact component={Authentication} />
                <Route path="/logout" exact component={Logout}/>
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

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
};

export default withRouter(connect(null, mapDispatchToProps)(App));
