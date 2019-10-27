/**
 * Author : Akila Devinda Rathnayaka
 * Copyrights: SAKS Global
 * Version: 
 * Description: Routing Stack for the application
 * Date: 
 */

import { Easing, Animated } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import Splash from '../screens/Splash/Splash';
import Login from '../screens/Login/Login';
import Home from '../screens/Home/Home';

//Creating Stack Navigator for All Routes in Application
const AppNavigator = createStackNavigator({
    Splash: { screen: Splash },
    Login: { screen: Login },
    Home: { screen: Home },
  },
    {
      headerMode: 'none',
      title: 'none',
      initialRouteName: 'Splash',
      transitionConfig: () => ({
        transitionSpec: {
          duration: 500,
          easing: Easing.out(Easing.poly(4)),
          timing: Animated.timing,
        },
      })
});
  
    
//Make App Navigator to creating app container
const AppContainer = createAppContainer(AppNavigator);

//exporting App Conrainer with all routing pages
export default AppContainer;
  
  