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
    userId: null,
    error: null,
    loading: false,
    saving: false
};

const fetchMyData = (state, action) => {
    console.log(action.series);
    let newState = null;
    if (action.options) {
        newState = {
            options: action.options,
            series: action.series,
            loading: false,
            error: null,
            userId: action.userId
        };
    } else newState = {
        series: action.series,
        loading: false,
        error: null,
        userId: action.userId
    };
    return updateObject(state, newState)
};

const saveMyOptions = (state, action) => {
    return updateObject(state, {
        options: action.options,
        error: null,
        loading: false
    })
};

const saveMySeries = (state, action) => {
    return updateObject(state, {
        series: state.series.concat(action.series),
        error: null,
        saving: false
    })
};

const deleteMySeries = (state, action) => {
    return updateObject(state, {
        series: state.series.filter(serie => serie.id !== action.seriesId),
        error: null,
        saving: false
    })
};

const clearMyData = (state) => {
    return updateObject(state, {
        series: [],
        error: null,
        saving: false,
        userId: null,
        options: {
            search: '',
            filter: 'none',
            order: 'ascending',
            sortBy: 'name'
        },
    })
};

const myTrackedSeriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FIREBASE_FETCH_DATA_SUCCES:
            return fetchMyData(state, action);
        case actionTypes.FIREBASE_SAVE_OPTIONS_SUCCES:
            return saveMyOptions(state, action);
        case actionTypes.FIREBASE_SAVE_SERIES_SUCCES:
            return saveMySeries(state, action);
        case actionTypes.FIREBASE_FAIL:
            return updateObject(state, {error: action.error, loading: false, saving: false});
        case actionTypes.FIREBASE_START:
            return updateObject(state, {error: null, loading: true});
        case actionTypes.FIREBASE_SAVE:
            return updateObject(state, {error: null, saving: true});
        case actionTypes.FIREBASE_DELETE_SERIES_SUCCES:
            return deleteMySeries(state, action);
        case actionTypes.CLEAR_MY_DATA:
            return clearMyData(state);

        default:
            return state;
    }
};

export default myTrackedSeriesReducer;