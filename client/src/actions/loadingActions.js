import {LOADING,NOT_LOADING} from './constants/constants'

export const loading = ()=>({
    type:LOADING
})

export const notLoading = ()=>({
    type:NOT_LOADING
})