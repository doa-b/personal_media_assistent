import axios from 'axios'
import * as keys from '../../kluis'
import * as actionTypes from './actionTypes';
import { addToLocalStorage, removeFromLocalStorage } from '../../shared/utility'
import {clearMyData} from './myTrackedSeriesActions';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (idToken, userId, name, photoUrl) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId,
        name: name,
        photoUrl: photoUrl
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const logout = () => {
    removeFromLocalStorage();
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const preLogout = () => {
    return dispatch => {
        dispatch(clearMyData());
        dispatch(logout());
    }
};

// Asynchronous ActionCreators
export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(preLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            const tvdbToken = localStorage.getItem('tvdbToken');
            if(expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(getProfileInfo(token));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            } else dispatch(logout());
        }
    }
};

export const login = (data) => {
    return dispatch => {
        dispatch(authStart());
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + keys.VUUR
        const authData = {
            email: data.email,
            password: data.password,
            returnSecureToken: true
        };
        axios.post(url, authData)
            .then((response => {
                console.log(response);
                addToLocalStorage(response.data.idToken, response.data.expiresIn, response.data.localId);
                dispatch(getProfileInfo(response.data.idToken));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            }))
            .catch(err => {
                console.log(err.response.data.error);
                dispatch(authFail(err.response.data.error));
            })
    }
};

export const register = (data, photoUrl) => {
    return dispatch => {
        dispatch(authStart());
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + keys.VUUR;
        const authData = {
            email: data.email,
            password: data.password,
            returnSecureToken: true
        };
        axios.post(url, authData)
            .then((response => {
                console.log(response);
                dispatch(updateProfile(response.data.idToken, data, photoUrl, false ))
            }))
            .catch(err => {
                console.log(err.response.data.error);
                dispatch(authFail(err.response.data.error));
            })
    }
};

export const updateProfile = (idToken, data, photoUrl) => {
    return dispatch => {
        dispatch(authStart());
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=' + keys.VUUR;
        const authData = {
            idToken: idToken,
            email: data.email,
            password: data.password,
            displayName: data.name,
            photoUrl: photoUrl,
            returnSecureToken: true
        };
        axios.post(url, authData)
            .then((response => {
                console.log(response);
                addToLocalStorage(response.data.idToken, response.data.expiresIn, response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId, data.name, photoUrl));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            }))
            .catch(err => {
                console.log(err.response.data.error)
                dispatch(authFail(err.response.data.error));
            })
    }
};

export const getProfileInfo = (idToken)=>  {
    return dispatch => {
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + keys.VUUR, {idToken: idToken})
            .then((response => {
                const user = response.data.users[0];
                console.log(response);
                dispatch(authSuccess(idToken, user.localId, user.displayName, user.photoUrl));
            }))
            .catch(err => {
                console.log(err.response.data.error);
                dispatch(authFail(err.response.data.error));
            })
    }
};

// timer that will fire logout action after token expires
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
};