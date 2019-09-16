import axios from 'axios'
import * as keys from '../../kluis'
import * as actionTypes from './actionTypes';
import * as constants from '../../shared/constants';
import {seriesSuccess} from "./seriesActions";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('tvdbToken');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            const tvdbToken = localStorage.getItem('tvdbToken');
            if(expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(seriesSuccess(tvdbToken));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
            } else dispatch(logout());
        }
    }
};

// Asynchronous actionCreators

export const auth = (email, password, operation, name, photoUrl) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + keys.VUUR;
        if (operation===constants.AUTH_SIGN_IN) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + keys.VUUR
        }

        axios.post(url, authData)
            .then((response => {
                console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            }))
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })
    }
};

// timer that will fire logout action after token expires
export const checkAuthTimeout = (expirationTime) => {
    console.log(expirationTime);
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
};

export const updateProfile = (userData) => {

};
