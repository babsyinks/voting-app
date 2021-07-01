import {TIMER_ENABLED,TIMER_DISABLED,LIVE_TIMER_ENABLED,LIVE_TIMER_DISABLED,TIMER_RESET} from './constants/constants'

export const timerIsEnabled = (payload)=>({
    type:TIMER_ENABLED,
    payload
})

export const timerIsDisabled = (timerObj)=>{
    if(timerObj){
        return {
            type:TIMER_DISABLED,
            payload:{...timerObj,electionStartSet:false}
        }
    }
    else{
        return {
                type:TIMER_DISABLED,
                payload:{electionStartSet:false}
            }
    }

}

export const liveTimerIsEnabled = (payload)=>({
    type:LIVE_TIMER_ENABLED,
    payload
})

export const liveTimerIsDisabled = (timerObj)=>{

    if(timerObj){
        return {
            type:LIVE_TIMER_DISABLED,
            payload:{...timerObj,electionEndSet:false}
        }
    }
    else{
        return {
                type:LIVE_TIMER_DISABLED,
                payload:{electionEndSet:false}
            }
    }
}

export const resetTimer = ()=>({
    type:TIMER_RESET
})