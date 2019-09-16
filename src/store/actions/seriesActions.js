import axios from '../../axios/tvdbAxios'
import * as keys from '../../kluis'
import * as actionTypes from './actionTypes';
import * as constants from "../../shared/constants";

export const seriesStart = () => {
    return {
        type: actionTypes.TVDB_LOGIN_START
    }
};

export const seriesSuccess = (idToken) => {
    return {
        type: actionTypes.TVDB_LOGIN_SUCCESS,
        idToken: idToken
    }
};

export const tvdbFail = (error) => {
    return {
        type: actionTypes.TVDB_FAIL,
        error: error
    }
};

// export const tvdbLogout = () => {
//     localStorage.removeItem('TvdbToken');
//     return {
//         type: actionTypes.TVDBLOGOUT
//     }
// };

// Asynchronous actionCreators

export const loginTvdb = () => {
    return dispatch => {
        const authData = {
            apikey: keys.TVDB_SLEUTEL,
            userkey: keys.TVDB_USERKEY,
            username: keys.TVDB_USERNAME
        };
        axios.post('/login', authData)
            .then((response => {
                console.log(response);
                localStorage.setItem('tvdbToken', response.data.token);
                dispatch(seriesSuccess(response.data.token));
            }))
            .catch(err => {
                console.log(err);
                dispatch(tvdbFail(err.response.data.error))
            })
    }
};

export const getSeriesDetails = () => {
    return dispatch => {

        axios.get('https://cors-anywhere.herokuapp.com/https://api.thetvdb.com/series/153021?authorization Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Njg1NDMyNTMsImlkIjoicG1hIiwib3JpZ19pYXQiOjE1Njg0NTY4NTMsInVzZXJpZCI6NTM3ODc0LCJ1c2VybmFtZSI6ImRqZG9hbWd5In0.fSyNLyfFb_HfnryZ7tOnE1374C5dXaOBs6p5bSPrIJf5ekIgX1CpVtNFK3W0jnw5abtX5Temc5hA8rJdR8eeqxXiUY6albiqBNsRGOPhkUD3qC3H1vCVI__SQT0_kqUP-YEnEq3VaahU1WLrJGV4fba-fkk-_pHO0lejBytoCFSZnYLE0xChjR4vy04tVVbal_UGSbqrHcR4YfRQJqe7IYYTmpZGcfwF-wR-6VpK90VXy6E4gy6mfVO8hlmSLvkY14JTJJLj181iDnOZqsJ0d_08W1nrra4vFZWM-nrnpOOp2Il6FOy3loj6sIr4kD9oZKHI8mhnITKQSBzwoxMqmQ')
            .then((response) => {
                console.log(response);
            })
    };
};