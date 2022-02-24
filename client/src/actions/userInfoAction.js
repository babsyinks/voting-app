/*  import {USER_INFO} from './constants/constants'

export const setUserInfo = (egcaNum,name)=>({
    type:USER_INFO,
    payload:{egcaNum,name}
}) */ 

const setUserInfo = (egcaNum,name)=>({
    type:'USER_INFO',
    payload:{egcaNum,name} 
})  

module.exports = setUserInfo


