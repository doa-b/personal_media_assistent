import React, {Component} from 'react';
import './App.css';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'

import Layout from './hoc/Layout/Layout'
import SeriesList from './containers/SeriesList/SeriesList'
import Authentication from './containers/Authentication/Authentication'

class App extends Component {

    render() {

        let routes = (
            <Switch>
                <Route path="/" exact component={SeriesList} />
                <Route path="/authentication" exact component={Authentication} />
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


export default withRouter(App);
