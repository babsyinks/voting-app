import {LOADING,NOT_LOADING} from '../actions/constants/constants'
const loaderReducer = (state = false,action)=>{
    switch(action.type){
        case LOADING:
            return true
        case NOT_LOADING:
            return false
        default:
            return state
    }
}

export default loaderReducer