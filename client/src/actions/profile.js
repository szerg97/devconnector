import axios from 'axios';
import {setAlert} from './alert';
import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    BASE_URL
} from './types';

//Get current user's profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get(`${BASE_URL}/api/profile/me`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

//Create or update profile
export const createProfile = (formData, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post(`${BASE_URL}/api/profile`, formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        return true;

    } catch (err) {
        
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }

    return false;
}

//Add experience
export const addExperience = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Conetent-Type': 'application/json'
            }
        }

        const res = await axios.put(`${BASE_URL}/api/profile/experience`, formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added', 'success'));

        return true;

    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }

    return false;
}

//Add experience
export const addEducation = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Conetent-Type': 'application/json'
            }
        }

        const res = await axios.put(`${BASE_URL}/api/profile/education`, formData, config);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Added', 'success'));

        return true;

    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }

    return false;
}