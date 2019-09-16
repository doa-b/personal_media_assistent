import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom';
import thunk from 'redux-thunk'
import axios from 'axios'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import seriesReducer from './store/reducers/seriesReducer'
import authReducer from './store/reducers/authReducer'

import {library} from '@fortawesome/fontawesome-svg-core'
import {
    faStepForward,
    faTimesCircle,
    faSortUp,
    faSortDown,
    faSearch,
    faPlusCircle,
    faUserTie,
    faBars
} from '@fortawesome/free-solid-svg-icons'

library.add(
    faStepForward,
    faTimesCircle,
    faSortUp,
    faSortDown,
    faSearch,
    faPlusCircle,
    faUserTie,
    faBars
)
;

// axios configurations
axios.defaults.headers.post['content-Type'] = 'application/json';

const rootReducer = combineReducers({
    series: seriesReducer,
    auth: authReducer,
});

const composeEnhancers = (process.env.NODE_ENV ==='development') ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(rootReducer,
    composeEnhancers(applyMiddleware(thunk)));

const app = (
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);

ReactDOM.render(<Provider store={store}>{app}</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
