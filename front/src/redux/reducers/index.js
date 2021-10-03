import { combineReducers } from 'redux';
// import userReducer from './user'
import auth from './authReducer'
import token from './tokenReducer'
import users from './usersReducer';
import restaurants from './restaurantsReducer';
const reducers = combineReducers(
    {
        auth,
        token,
        users,
        restaurants,
    });


export default reducers;