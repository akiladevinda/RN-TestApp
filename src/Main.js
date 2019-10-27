/**
 * Author : Akila Devinda Rathnayaka
 * Copyrights: SAKS Global
 * Version: 
 * Description: Main App Loading Registry Component
 * Date: 
 */

import React from 'react';
import AppContainer from './routes/routes';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import cfgStore, { persistor } from './redux/store/configureStore';

const store = cfgStore();

console.disableYellowBox = true;  //Deisbale yellow box
class Main extends React.Component {
  render() {
    return(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <AppContainer/>
            </PersistGate>
        </Provider>
    );
  }
}

export default Main;