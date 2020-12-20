import {SHOW_MESSAGE,HIDE_MESSAGE} from '../actions/constants/constants'

const messageReducer = (state = false,action)=>{
    switch(action.type){
        case SHOW_MESSAGE:
            return true
        case HIDE_MESSAGE:
            return false
        default:
            return state
    }
}

export default messageReducer