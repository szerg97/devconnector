import axios from 'axios';
import {setAlert} from './alert';
import {
    GET_PROFILE,
    PROFILE_ERROR,
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
    let result = 400;
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post(`${BASE_URL}/api/profile`, formData, config);
        result = res.status;
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