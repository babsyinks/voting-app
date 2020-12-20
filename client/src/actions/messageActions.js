import {SHOW_MESSAGE,HIDE_MESSAGE} from './constants/constants'

export const displayMessage = ()=>({
    type:SHOW_MESSAGE
})

export const dontDisplayMessage = ()=>({
    type:HIDE_MESSAGE
})
