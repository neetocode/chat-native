import { combineReducers } from 'redux'


import generalReducers from './../general/generalReducers'


const rootReducer = combineReducers({
    general: generalReducers
})

export default rootReducer