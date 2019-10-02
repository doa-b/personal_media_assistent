import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../../shared/utility';

const initialState = {
    series: [],
    options: {
        search: '',
        filter: 'none',
        order: 'ascending',
        sortBy: 'name'
    },
    idToken: null,
    error: null,
    loading: false
};

const fetchMyData = (state, action) => {
    console.log(action.series);
    let newState = null;
    if (action.options) {
        newState = {
            options: action.options,
            series: action.series,
            loading: false,
            error: null
        };
    } else newState = {
        series: action.series,
        loading: false,
        error: null
    };
    return updateObject(state, newState)
};

const SaveMyOptions = (state, action) => {
    return updateObject(state, {
        options: action.options,
        error: null,
        loading: false
    })
};

const SaveMySeries = (state, action) => {
    return updateObject(state, {
        series: state.series.concat(action.series),
        error: null,
        loading: false
    })
};

const myTrackedSeriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FIREBASE_FETCH_DATA_SUCCES:
            return fetchMyData(state, action);
        case actionTypes.FIREBASE_SAVE_OPTIONS_SUCCES:
            return SaveMyOptions(state, action);
        case actionTypes.FIREBASE_SAVE_SERIES_SUCCES:
            return SaveMySeries(state, action);
        case actionTypes.FIREBASE_FAIL:
            return updateObject(state, {error: action.error, loading: false});
        case actionTypes.FIREBASE_START:
            return updateObject(state, {error: null, loading: true});
        default:
            return state;
    }

};

export default myTrackedSeriesReducer;