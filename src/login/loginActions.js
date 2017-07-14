import axios from 'axios'



export const setToken = (token) => {
    return ({type:'SET_TOKEN', payload: token})
}