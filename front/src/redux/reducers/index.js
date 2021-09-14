import {combineReducers} from 'redux' ; 
// import userReducer from './user'
import auth from './authReducer'
import token from './tokenReducer'
 const reducers=combineReducers({auth,token}) ; 


 export default reducers  ; 