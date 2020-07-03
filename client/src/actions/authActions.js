import axios from "axios";
import { returnErrors, clearErrors } from "./errorActions"
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';


//Check token and load user
export const loadUser = () => (dispatch, getState) => {
    //Set loading to TRUE
    dispatch({ type: USER_LOADING })

    axios
        .get('/api/auth/user', tokenConfig(getState))
        .then( res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch( err => {
            dispatch( returnErrors( err.response.data.msg, err.response.status ));
            dispatch({
                type: AUTH_ERROR
            });
        })
}

//Register user
export const registerUser = ({name, email, password}) => dispatch => {
    //Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    //Object with all the DATA that comes in
    let body = JSON.stringify({name, email, password})

    axios.post('/api/users', body, config)
         .then( res => dispatch({
             type: REGISTER_SUCCESS,
             payload: res.data
         }))
         .catch( err => {
            dispatch( returnErrors( err.response.data.msg, err.response.status, 'REGISTER_FAIL'))
            dispatch({ type: REGISTER_FAIL });
         });

}

//LOGIN user
export const login = ({email, password}) => dispatch => {
    //Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    //Object with all the DATA that comes in
    let body = JSON.stringify({email, password})

    axios.post('api/auth', body, config)
         .then( res => dispatch({
             type: LOGIN_SUCCESS,
             payload: res.data
         }))
         .catch( err => {
             dispatch( returnErrors(err.response.data.msg, err.response.status, 'LOGIN_FAIL'))
             dispatch({type: LOGIN_FAIL})
         })
}

//LOGOUT user, come everything back
export const logout = () => {
    return ({
        type: LOGOUT_SUCCESS
    })
}

//Setup token
export const tokenConfig = getState => {
    //Get the token
    let token = getState().auth.token;
    //Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    //If there is a token, add it to the header
    if(token){
        config.headers['x-auth-token'] = token
    }
    return config;
}
