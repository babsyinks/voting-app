import {ADMIN_AUTH_SUCCESS,ADMIN_AUTH_FAILURE} from '../actions/constants/constants'
const adminReducer = (state = {adminIsAuthenticated:false},action)=>{

    switch(action.type){
        case ADMIN_AUTH_SUCCESS:
            return {adminIsAuthenticated:true}
        case ADMIN_AUTH_FAILURE:
            return {adminIsAuthenticated:false}
        default:
            return state
    }

}

export default adminReducer