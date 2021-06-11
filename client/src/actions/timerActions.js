import {TIMER_ENABLED,TIMER_DISABLED} from './constants/constants'

export const timerIsEnabled = (payload)=>({
    type:TIMER_ENABLED,
    payload
})

export const timerIsDisabled = ()=>({
    type:TIMER_DISABLED,
    payload:{timerSet:false}
})