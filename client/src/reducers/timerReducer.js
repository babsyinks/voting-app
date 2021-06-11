import {TIMER_ENABLED,TIMER_DISABLED} from '../actions/constants/constants'

const timerReducer = (state = {timerSet:false},action)=>{
    switch(action.type){
        case TIMER_ENABLED:
            return action.payload
        case TIMER_DISABLED:
            return action.payload
        default:
            return state
    }
}

export default timerReducer