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
    loading: false,
    results: []
};

const tmdbFindSeries = (state, action) => {
    return updateObject ( state, {
        results: action.results,
        error: null,
        loading: false
    })
};

const seriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TMDB_FIND_SERIES_SUCCES: return tmdbFindSeries(state, action);
        case actionTypes.TMDB_FAIL: return updateObject(state, {error: action.error, loading: false});



        default: return state;
    }

};

export default seriesReducer;