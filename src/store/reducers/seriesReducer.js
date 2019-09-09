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
    ]
}
;

const seriesReducer = (state = initialState, action) => {
    return state;
};

export default seriesReducer;