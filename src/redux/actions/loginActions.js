/**
 * Author : Akila Devinda Rathnayaka
 * Copyrights: SAKS Global
 * Version:
 * Description: Redux Login Actions -> functions
 * Date:
 */

import * as ActionType from './loginActionTypes';
import AsyncStorage from '@react-native-community/async-storage';
import {URL} from '../../config';
import Home from '../../screens/Home/Home';
import Login from '../../screens/Login/Login';

//User login success action
export const isLogged = bool => {
  return {
    type: ActionType.USER_IS_LOGGED,
    isLogged: bool,
  };
};

//User authentication error
export const userAuthError = bool => {
  return {
    type: ActionType.LOGIN_AUTH_ERROR,
    authError: bool,
  };
};

//User login error action
export const loginHasError = bool => {
  return {
    type: ActionType.LOGIN_ERROR,
    hasError: bool,
  };
};

//User login loading action
export const loginIsLoading = bool => {
  return {
    type: ActionType.LOGIN_IS_LOADING,
    isLoading: bool,
  };
};

//Set the user email to async storage
setValue = async email => {
  try {
    await AsyncStorage.setItem('Async_Email', JSON.stringify(email));
  } catch (e) {
    // save error
    console.warn('Async Set Error - ', e);
  }

  console.log('Email Set Done.');
};

//Remove all the async storage items and keys
removeAllAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // remove error
    console.warn('Async Clear Error - ', e);
  }

  console.log('Async Clear Done.');
};

//User Login Action
export const login = (email, password, navigation) => {
  console.log('email', email);
  console.log('pass', password);

  return dispatch => {
    // Dispatch the user login loading
    dispatch(loginIsLoading(true));

    // check the user login values
    if (!email || !password) {
      // Dispatch user login error
      dispatch(loginHasError(true));
      // DIspatch loading to false
      dispatch(loginIsLoading(false));

      return;
    }

    fetch(URL.USER_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
    })
      .then(res => res.json())
      .then(res => {
        //Dispatch loading to false
        dispatch(loginIsLoading(false));

        console.log('Response from the URL - ', res);

        //Response 200 -> Login Success Full
        if (res.status_code == '200') {
          //Navigate to home screen
          console.log('Login Success !');

          dispatch(loginHasError(false));
          dispatch(isLogged(true));
          this.setValue(email); // Parse email to save local storafe -> Async
          navigation.navigate('Home', {screen: Home}); //Navigate to Home Screen
        } else if (res.status_code == '401') {
          //401 -> Invalid credentials
          dispatch(userAuthError(true));
        }
      })
      .catch(e => {
        console.warn('URL Fetch Error - ', e);
        dispatch(loginIsLoading(false));
        //Dispatch Login Error
        dispatch(loginHasError(true));
      });
  };
};

//User log out action
export const logout = navigation => {
  this.removeAllAsyncStorage();
  navigation.navigate('Login', {screen: Login});
  return {
    type: ActionType.LOGOUT_USER,
  };
};
