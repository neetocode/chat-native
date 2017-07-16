import axios from 'axios'

import { desconectaWs, conectarWs } from './../general/generalActions'


export const setToken = (token) => {
    return dispatch => {
        dispatch({type:'SET_TOKEN', payload: token})
        dispatch(conectarWs(token))
    }

}


export const sair = () => {
    return dispatch => {
        dispatch({type:'SET_TOKEN', payload: null})
        dispatch(desconectaWs())
    }
}