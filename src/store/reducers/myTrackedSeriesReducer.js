import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility';

const initialState = {
    series: [],
    search: 'dead',
    filter: 'continuing',
    order: 'Ascending',
    idToken: null,
    error: null,
    loading: false,
   // episodeDetails: null,
};

const fetchMySeries = (state, action) => {
  return updateObject(state, {
      loading: false
  })
};

const SaveMySeries = (state, action) => {
    return updateObject ( state, {

        results: action.results,
        error: null,
        loading: false
    })
};

const myTrackedSeriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FIREBASE_FETCH_DATA_SUCCES: return fetchMySeries(state, action);
        case actionTypes.FIREBASE_SAVE_SUCCES: return SaveMySeries(state, action);
        case actionTypes.FIREBASE_FAIL: return updateObject(state, {error: action.error, loading: false});
        case actionTypes.FIREBASE_START: return updateObject(state, {error: null, loading: true});
        default: return state;
    }

};

export default myTrackedSeriesReducer;