import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux'
import {Provider} from 'react-redux'

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

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import seriesReducer from './store/reducers/seriesReducer'

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

const store = createStore(seriesReducer);

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
