/**
 * Author : Akila Devinda Rathnayaka
 * Copyrights: SAKS Global
 * Version:
 * Description: Comine all the available redux reducers
 * Date:
 */

import {combineReducers} from 'redux';
import loginReducer from './loginReducer';

export default combineReducers({
  loginReducer: loginReducer,
});
