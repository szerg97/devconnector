import axios from 'axios';
import {setAlert} from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL, BASE_URL } from './types';

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
}