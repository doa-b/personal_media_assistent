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
    episodeDetails: null,
    results: [] // todo Kan weg
};

const tmdbFindSeries = (state, action) => {
    return updateObject ( state, {
        results: action.results,
        error: null,
        loading: false
    })
};

const addSeries = (state, action) => {
    const newSeries = {
        id: action.details.id,
        name: action.details.name,
        season: 1,
        seasonTotal: action.details.season_number,
        episode: 1,
        episodeTotal: action.details.seasons[1].episode_count,
        episodeTitle: action.details.seasons[1].name,
        episodeDescription: 'bla bla bla bla bla',
        nextEpisode: action.details.next_episode_to_air, // TODO aanpassen
        status: action.details.name.status
    };
    return updateObject (state, {
        series: state.series.concat(newSeries),
        loading: false,
        error: null,
    } )
};

const seriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_EPISODE_DETAILSSUCCES: return updateObject(state, {episodeDetails: action.episodeDetails, error: null, loading: true})
        case actionTypes.TMDB_START: return updateObject(state, {error: null, loading: true});
        case actionTypes.ADD_SERIES_SUCCES: return addSeries(state, action);
        case actionTypes.TMDB_FIND_SERIES_SUCCES: return tmdbFindSeries(state, action);
        case actionTypes.TMDB_FAIL: return updateObject(state, {error: action.error, loading: false});



        default: return state;
    }

};

export default seriesReducer;