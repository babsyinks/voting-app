import {TIMER_ENABLED,TIMER_DISABLED,LIVE_TIMER_ENABLED,LIVE_TIMER_DISABLED,TIMER_RESET} from '../actions/constants/constants'

const timerReducer = (state = {electionStartSet:false, electionEndSet:false},action)=>{
    switch(action.type){
        case TIMER_ENABLED:
            return {...state,...action.payload}
        case TIMER_DISABLED:
            return {...state,...action.payload}
        case LIVE_TIMER_ENABLED:
            return {...state,...action.payload}
        case LIVE_TIMER_DISABLED:
            return {...state,...action.payload}
        case TIMER_RESET:
                return {electionStartSet:false, electionEndSet:false}
        default:
            return state
    }
}

export default timerReducer