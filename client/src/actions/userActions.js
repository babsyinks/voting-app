import {USER_AUTH_SUCCESS,USER_AUTH_FAILURE} from './constants/constants'

export const userAuthenticated = ()=>({
    type:USER_AUTH_SUCCESS
})

export const userNotAuthenticated = ()=>({
    type:USER_AUTH_FAILURE
})