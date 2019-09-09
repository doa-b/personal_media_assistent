const initialState = {
    series: [
        {
            id: 0,
            name: 'The walking Dead',
            season: 1,
            episode: 2,
            episodeTitle: 'Ye of little faith',
            episodeDescription: 'bla bla bla bla bla',
            seriesEnded: false,
            nextAirDate: Date(),
            status: 'continuing'
        }
    ]
}
;

const seriesReducer = (state = initialState, action) => {
    return state;
};

export default seriesReducer;