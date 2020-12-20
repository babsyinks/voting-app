import {USER_INFO} from '../actions/constants/constants'
const userInfoReducer = (state = {egcaNum:0,name:''},action)=>{
    switch(action.type){
        case USER_INFO:
            return {egcaNum:action.payload.egcaNum,name:action.payload.name}

        default:
            return state
    }
}

export default userInfoReducer