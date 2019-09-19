import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../../shared/utility';

const initialState = {
    seriesDetails: null,
    episodeDetails: null,
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

const tmdbFetchSeriesDetails = (state, action) => {
    return  updateObject ( state, {
        seriesDetails: action.seriesDetails,
        error: null,
        loading: false
    })
};

const tmdbFetchEpisodeDetails = (state, action) => {
    return  updateObject ( state, {
        episodeDetails: action.episodeDetails,
        error: null,
        loading: false
    })
};

const seriesReducer2 = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SERIES_DETAILSSUCCES: return tmdbFetchSeriesDetails(state, action);
        case actionTypes.FETCH_EPISODE_DETAILSSUCCES: return tmdbFetchEpisodeDetails(state, action);
        case actionTypes.TMDB_FIND_SERIES_SUCCES: return tmdbFindSeries(state, action);
        case actionTypes.TMDB_START: return updateObject(state, {error: null, loading: true});
        case actionTypes.TMDB_FAIL: return updateObject(state, {error: action.error, loading: false});
        default: return state;
    }
};

export default seriesReducer2;
