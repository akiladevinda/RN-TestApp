/**
 * Author : Akila Devinda Rathnayaka
 * Copyrights: SAKS Global
 * Version:
 * Description: Splash Screen
 * Date:
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  BackHandler,
} from 'react-native';
import {Images, ScaleUnits} from '../../config';
import AsyncStorage from '@react-native-community/async-storage';
import Home from '../Home/Home';
import Login from '../Login/Login';
const {SplashBackground, SplashLogo} = Images.Splash;

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('Splash componentDidMount');

    //Check the app is already lauched to home screen or not -> tricky hack without back end authentication
    //We can make proper back end API call to validate if the user logged or not valid session details
    AsyncStorage.getItem('AppLaunched').then(value => {
      var launchedBefore = JSON.parse(value);
      if (launchedBefore == null) {
        setTimeout(() => {
          this.props.navigation.navigate('Login', {screen: Login});
        }, 1000);
      } else if (launchedBefore == true) {
        setTimeout(() => {
          this.props.navigation.navigate('Home', {screen: Home});
        }, 1000);
      } else if (launchedBefore == false) {
        setTimeout(() => {
          this.props.navigation.navigate('Login', {screen: Login});
        }, 1000);
      }
    });
  }

  componentWillUnmount() {
    // This is just necessary in the case that the screen is closed before the timeout fires,
    // otherwise it would cause a memory leak that would trigger the transition regardless,
    // breaking the user experience.
    clearTimeout(this.timeoutHandle);
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={SplashBackground} style={styles.splashBg}>
          <Image source={SplashLogo} style={styles.splashLogo} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashBg: {
    width: ScaleUnits.width,
    height: ScaleUnits.height,
  },
  splashLogo: {
    width: ScaleUnits.scale(200),
    height: ScaleUnits.scale(300),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: ScaleUnits.width / 2,
  },
});
