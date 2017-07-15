import axios from 'axios'

import { conectarWs } from './../general/generalActions'


export const setToken = (token) => {
    return dispatch => {
        dispatch({type:'SET_TOKEN', payload: token})
        dispatch(conectarWs(token))
    }

}