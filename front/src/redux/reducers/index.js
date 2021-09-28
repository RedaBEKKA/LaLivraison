import { combineReducers } from 'redux';
// import userReducer from './user'
import auth from './authReducer'
import token from './tokenReducer'
import users from './usersReducer';
const reducers = combineReducers(
    {
        auth,
        token,
        users
    });


export default reducers;