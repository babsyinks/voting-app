import {USER_AUTH_SUCCESS,USER_AUTH_FAILURE} from '../actions/constants/constants'
const userReducer = (state = {userIsAuthenticated:false},action)=>{
    switch(action.type){
        case USER_AUTH_SUCCESS:
            return {userIsAuthenticated:true}
        case USER_AUTH_FAILURE:
            return {userIsAuthenticated:false}
        default:
            return state
    }
}

export default userReducer