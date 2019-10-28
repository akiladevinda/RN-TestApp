/**
 * Author : Akila Devinda Rathnayaka
 * Copyrights: SAKS Global
 * Version:
 * Description: Config the Redux Store and Applying Middleware
 * Date:
 */

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const cfgStore = () => {
  const middlewares = [thunk];
  const enhancer = applyMiddleware(...middlewares);
  const persistedReducer = persistReducer(persistConfig, reducers);

  // create store
  return createStore(persistedReducer, enhancer);
};

export const persistor = persistStore(cfgStore());

export default cfgStore;
