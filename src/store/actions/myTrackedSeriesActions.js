import * as actionTypes from './actionTypes';
import axios from '../../axios/fireBaseAxios';

export const fireBaseStart = () => {
    return {
        type: actionTypes.FIREBASE_START
    }
};

export const fireBaseSaveSucces = () => {
    return {
        type: actionTypes.FIREBASE_SAVE_SUCCES
    }
};

export const fireBaseFetchSucces = () => {
    return {
        type: actionTypes.FIREBASE_FETCH_DATA_SUCCES
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
        const data = {
            userId: userId,
            seriesData: seriesData
        };
        axios.put(`${userId}/series/${seriesData.seriesId}.json?auth=` + token, data)
            .then((response) => {
                console.log(response);
                dispatch(fireBaseSaveSucces)
            })
            .catch(error => {
                dispatch(fireBaseFail(error));
            });
    }};

export const saveMyOptions = (token, userId, options) => {
    return dispatch => {
        dispatch(fireBaseStart());
        const data = {
            userId: userId,
            options: options
        };
        axios.put(`${userId}/options.json?auth=` + token, data)
            .then((response) => {
                dispatch(fireBaseSaveSucces)
            })
            .catch(error => {
                dispatch(fireBaseFail(error));
            });
    }};

export const fetchMyData = () => {
    return (dispatch, getState) => {
        dispatch(fireBaseStart());
        // we get the auth data here directly from the store, not from Caller
        axios.get(`/${getState().auth.userId}.json?auth=` + getState().auth.idToken)
            .then((response) => {
                console.log(response);
                dispatch(fireBaseFetchSucces(response.data))
            })
            .catch(error => {
                dispatch(fireBaseFail(error));
            });
    }
};

// fetchmyoptions
