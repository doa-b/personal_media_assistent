import axios from 'axios'
import * as keys from '../../kluis'
import * as actionTypes from './actionTypes';
import * as constants from '../../shared/constants';

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

// Asynchronous actionCreators

export const auth = (email, password, operation) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            requireSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + keys.VUUR;
        if (operation===constants.AUTH_SIGN_IN) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + keys.VUUR
        }

        axios.post(url, authData)
            .then((response => {
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            }))
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })
    }
};
