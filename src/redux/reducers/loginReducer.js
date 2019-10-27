/**
 * Author : Akila Devinda Rathnayaka
 * Copyrights: SAKS Global
 * Version: 
 * Description: Redux Reducer -> Login Component
 * Date: 
 */


 import * as ActionTypes from '../actions/loginActionTypes';
import AsyncStorage from '@react-native-community/async-storage';

 //Set Initial state for the login component
 const initialState = {
    isLogged:false,
    hasError:false,
    isLoading:false,
    authError:false,
    email:'',
    password:'',
 };

 const loginReducer = ( state = initialState , action) => {

    const { type, payload } = action;

    switch(type)
    {
        case ActionTypes.USER_IS_LOGGED:
            console.log('isLogged',action)
            return Object.assign( {} ,state,{
                isLogged:action.isLogged,
            });
        case ActionTypes.LOGIN_ERROR:
            console.log('hasError',action)
            return Object.assign( {} ,state, {
                hasError:action.hasError,
            });
        case ActionTypes.LOGIN_AUTH_ERROR:
            console.log('authError',action)
            return Object.assign( {} , state, {
                authError:action.authError
            });
        case ActionTypes.LOGIN_IS_LOADING:
            console.log('isLoading',action)
            return Object.assign( {} , state , {
                isLoading:action.isLoading
            });
        case ActionTypes.LOGIN_USER:
            console.log('login',action)
            return Object.assign( {}, state , {
                isLogged:true,
                email:payload.message
            });
        case ActionTypes.LOGOUT_USER:
            console.log('logout',action)
            return Object.assign( {} , state , {
                isLogged:false,
                email:'',
                password:''
            });
        default:
            return state
    }
 }

 export default loginReducer;




