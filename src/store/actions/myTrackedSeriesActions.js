import * as actionTypes from './actionTypes';
import axios from '../../axios/fireBaseAxios';

export const fireBaseStart = () => {
    return {
        type: actionTypes.FIREBASE_START
    }
};

export const fireBaseSaveOptionsSucces = (options) => {
    return {
        type: actionTypes.FIREBASE_SAVE_OPTIONS_SUCCES,
        options: options
    }
};

export const fireBaseSaveSeriesSucces = (series) => {
    return {
        type: actionTypes.FIREBASE_SAVE_SERIES_SUCCES,
        series: series
    }
};

export const fireBaseFetchSucces = (options, series) => {
    return {
        type: actionTypes.FIREBASE_FETCH_DATA_SUCCES,
        options: options,
        series: series
    }
};

export const fireBaseDeleteSeriesSucces = (seriesId) => {
    return {
        type: actionTypes.FIREBASE_DELETE_SERIES_SUCCES,
        seriesId: seriesId
    }
};

export const fireBaseFail = () => {
    return {
        type: actionTypes.FIREBASE_FAIL
    }
};


// asynchronous actionsCreators
export const saveMySeries = (token, userId, seriesData) => {
    return dispatch => {
        dispatch(fireBaseStart());
        axios.put(`${userId}/series/${seriesData.seriesId}.json?auth=` + token, seriesData)
            .then((response) => {
                console.log(response);
                dispatch(fireBaseSaveSeriesSucces(seriesData))
            })
            .catch(error => {
                dispatch(fireBaseFail(error));
            });
    }};

export const saveMyOptions = (token, userId, options) => {
    return dispatch => {
        axios.put(`${userId}/options.json?auth=` + token, options)
            .then((response) => {
                dispatch(fireBaseSaveOptionsSucces(options))
            })
            .catch(error => {
                dispatch(fireBaseFail(error));
            });
    }};

export const deleteMySeries = (seriesId) => {
    return (dispatch, getState) => {
        dispatch(fireBaseStart());
        // we get the auth data here directly from the store, not from Caller
        axios.delete(`/${getState().auth.userId}/series/${seriesId}.json?auth=` + getState().auth.idToken)
            .then((response) => {
                console.log(response);
                dispatch(fireBaseDeleteSeriesSucces(seriesId))
            })
            .catch(error => {
                dispatch(fireBaseFail(error));
            });
    }
};

export const fetchMyData = (seriesId) => {
    return (dispatch, getState) => {
        dispatch(fireBaseStart());
        // we get the auth data here directly from the store, not from Caller
        axios.get(`/${getState().auth.userId}.json?auth=` + getState().auth.idToken)
            .then((response) => {
                console.log(response);
                const options = response.data.options;
                const series = [];
                for (let key in response.data.series) {
                    series.push(
                        {
                            ...response.data.series[key],
                            id: key
                        });
                }
                dispatch(fireBaseFetchSucces(options, series))
            })
            .catch(error => {
                dispatch(fireBaseFail(error));
            });
    };
};
