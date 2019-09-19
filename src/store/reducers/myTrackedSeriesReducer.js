import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../../shared/utility';

const initialState = {
    series: [
        {
            id: 0,
            name: 'The walking Dead',
            season: 1,
            episode: 2,
            episodeTitle: 'Ye of little faith',
            episodeDescription: 'bla bla bla bla bla',
            nextAirDate: '12-12-2020',
            status: 'continuing'
        },
        {
            id: 1,
            name: 'Dexter',
            season: 5,
            episode: 12,
            episodeTitle: 'Death comes in many ways',
            episodeDescription: 'bla bla bla bla bla',
            nextAirDate: null,
            status: 'continuing'
        }
    ],
    options: {
        search: 'dead',
        filter: 'continuing',
        order: 'Ascending',
    },
    idToken: null,
    error: null,
    loading: false,
    // episodeDetails: null,
};

const fetchMyData = (state, action) => {
    console.log(action.series);
    const newState =  {
        options: action.options,
        series: action.series,
        loading: false
    };
    return updateObject(state, newState)
};

const SaveMySeries = (state, action) => {
    return updateObject(state, {

        results: action.results,
        error: null,
        loading: false
    })
};

const myTrackedSeriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FIREBASE_FETCH_DATA_SUCCES:
            return fetchMyData(state, action);
        case actionTypes.FIREBASE_SAVE_SUCCES:
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