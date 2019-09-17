import axios from '../../axios/tvdbAxios'
import * as keys from '../../kluis'
import * as actionTypes from './actionTypes';
import * as constants from "../../shared/constants";

export const seriesStart = () => {
    return {
        type: actionTypes.TMDB_START
    }
};

export const findSeriesSucces = (results) => {
    return {
        type: actionTypes.TMDB_FIND_SERIES_SUCCES,
        results: results
    }
};

export const tmdbFail = (error) => {
    return {
        type: actionTypes.TMDB_FAIL,
        error: error
    }
};

export const findSeries = (query) => {
    return dispatch => {
        dispatch(seriesStart());
        axios.get('/search/tv', {
            params: {
                api_key: keys.TMDB_SLEUTEL,
                query: query
            }
        })
            .then((response) => {
                console.log(response.data.results);
                dispatch(findSeriesSucces(response.data.results))
            })
            .catch((err) => {
                console.log(err);
                dispatch(tmdbFail(err.response.data.error));

            });
    }
};

export const getSeriesDetails = (seriesId) => {
    return dispatch => {
        axios.get(`/tv/${seriesId}`, {
            params: {
                api_key: keys.TMDB_SLEUTEL
            }
        })
            .then((response) => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err);
                dispatch(tmdbFail(err.response.data.error));

            });
    }
};