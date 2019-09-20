import axios from '../../axios/tvdbAxios'
import * as keys from '../../kluis'
import * as actionTypes from './actionTypes';

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

export const fetchEpisodeDetailsSucces = (details) => {
    return {
        type: actionTypes.FETCH_EPISODE_DETAILSSUCCES,
        episodeDetails: details
    }
};

export const fetchSeriesDetailsSucces = (details) => {
    return {
        type: actionTypes.FETCH_SERIES_DETAILSSUCCES,
        seriesDetails: details
    }
};

// Asynchronous ActionReducers

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

export const fetchSeriesDetails = (seriesId) => {
    return dispatch => {
        axios.get(`/tv/${seriesId}`, {
            params: {
                api_key: keys.TMDB_SLEUTEL
            }
        })
            .then((response) => {
                console.log(response);
                dispatch(fetchSeriesDetailsSucces(response.data))
            })
            .catch((err) => {
                console.log(err);
                dispatch(tmdbFail(err.response.data.error));

            });
    }
};

export const fetchEpisodeDetails = (seriesId, season, episode)=> {
    return dispatch => {
        dispatch(seriesStart());
        axios.get(`/tv/${seriesId}/season/${season}/episode/${episode}`, {
            params: {
                api_key: keys.TMDB_SLEUTEL
            }
        })
            .then((response) => {
                console.log(response);
                dispatch(fetchEpisodeDetailsSucces(response.data))
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
// kan weg
//
// export const addSeries = (seriesId) => {
//     return dispatch => {
//         dispatch(seriesStart());
//         axios.get(`/tv/${seriesId}`, {
//             params: {
//                 api_key: keys.TMDB_SLEUTEL
//             }
//         })
//             .then((response) => {
//                 console.log(response);
//                 dispatch(AddSeriesSucces(response.data))
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }
// };
//
//
// // Kan weg
// export const saveMySeries = (token, userId, seriesData) => {
//     return dispatch => {
//     dispatch(fireBaseStart());
//     const data = {
//         userId: userId,
//         SeriesData: seriesData
//     };
//     axios.post('/series.json?auth=' + token, data)
//         .then((response) => {
//             dispatch(fireBaseSaveOptionsSucces)
//         })
//         .catch(error => {
//         dispatch(fireBaseFail(error));
//     });
// }};