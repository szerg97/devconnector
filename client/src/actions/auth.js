import axios from 'axios';
import {setAlert} from './alert';
import { 
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    USER_LOADED, 
    AUTH_ERROR, 
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    BASE_URL } from './types';
import setAuthToken from '../utils/setAuthToken';

//Load user
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get(`${BASE_URL}/api/auth`);

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

//Login user
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email, password});

    try {
        const res = await axios.post(`${BASE_URL}/api/auth`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

        //dispatch(setAlert('Login was successful', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type:LOGIN_FAIL
        });
    }
}

//Register user
export const register = ({name, email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({name, email, password});

    try {
        const res = await axios.post(`${BASE_URL}/api/users`, body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

        dispatch(setAlert('Register was successful', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type:REGISTER_FAIL
        });
    }
};

//Logout / Clear profile
export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
}