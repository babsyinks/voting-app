import {createStore,combineReducers,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import adminReducer from './adminReducer'
import userReducer from './userReducer'
import loaderReducer from './loaderReducer'
import messageReducer from './messageReducer';
import userInfoReducer from './userInfoReducer';
import timerReducer from './timerReducer'

const reducer = combineReducers({
    admin:adminReducer,
    user:userReducer,
    isLoading:loaderReducer,
    showMessage:messageReducer,
    userInfo:userInfoReducer,
    timer:timerReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))