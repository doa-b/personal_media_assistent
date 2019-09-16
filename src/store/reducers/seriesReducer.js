import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility';

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
    search: 'dead',
    filter: 'continuing',
    order: 'Ascending',
    idToken: null,
    error: null,
    loading: false
};

const tvdbLoginSucces = (state, action) => {
    return updateObject ( state, {
        idToken: action.idToken,
        error: null,
        loading: false
    })
};

const seriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TVDB_LOGIN_SUCCESS: return tvdbLoginSucces(state, action);
        case actionTypes.TVDB_FAIL: return updateObject(state, {error: action.error, loading: false});



        default: return state;
    }

};

export default seriesReducer;