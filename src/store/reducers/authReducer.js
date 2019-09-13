import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../shared/utility";


const initialState = {
    idToken: null,
    userId: null,
    error: null,
    loading: false,
};

const authSuccess = (state, action) => {
    return updateObject( state, {
        idToken: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    })
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return updateObject(state, {error: null, loading: true});
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return updateObject(state, {error: action.error, loading: false});
        case actionTypes.AUTH_LOGOUT: return updateObject(state, { idToken: null, userId: null });
        default: return state;
    }
};

export default reducer;