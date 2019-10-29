/**
 * Author : Akila Devinda Rathnayaka
 * Copyrights: SAKS Global
 * Version:
 * Description: Home Screen
 * Date:
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  BackHandler,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Button} from '../../components';
import {connect} from 'react-redux';
import {logout} from '../../redux/actions/loginActions';
import {ScaleUnits, AppStyles} from '../../config';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import AppleHealthKit from 'rn-apple-healthkit';

const options = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ_WRITE,
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_BODY_READ,
    Scopes.FITNESS_BODY_READ_WRITE,
  ],
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  componentDidMount() {
    console.log('Home componentDidMount');

    //Make async key to manage if the application already lauched or not ->
    //If the back end connected we can use end authentication
    AsyncStorage.setItem('AppLaunched', JSON.stringify(true));

    //Get the user logged email from async storage and set it to local state
    this.getUserEmail().then(Async_Email => {
      let user_email = JSON.parse(Async_Email);
      console.log('Async User Email : ', user_email);
      this.setState({email: user_email});
    });

    //Check platform
    if (Platform.OS === 'ios') {
      //Check Apple Health is Available
      AppleHealthKit.isAvailable((err, available) => {
        if (err) {
          console.log('error initializing Healthkit: ', err);
          return;
        }
        if (available == true) {
          this.connectToAppleHealKit(); //Connect Apple HealthKit Init
        } else {
          alert('Apple HealtKit Not Available');
        }
      });
    } else {
      this.requestLocationPermission(); //Connect Android Google Fit Init
    }

    //Android Hardware Back Press
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonPress,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonPress,
    );
  }

  //Get user email from async storage
  getUserEmail = async () => {
    const Async_Email = await AsyncStorage.getItem('Async_Email');
    return Async_Email;
  };

  //Handle android hardware back press -> Not using in ios
  handleBackButtonPress = () => {
    BackHandler.exitApp();
    return true;
  };

  //Requesting Location Permissions For Android
  async requestLocationPermission() {
    const chckLocationPermission = PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You've access for the location");
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Test App Needs Your Location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          this.connectToGoogleFit(); //If location permissions granted start using google fit
        } else {
          console.log("You don't have access for the location");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  //Connection to Google Fit
  connectToGoogleFit = () => {
    GoogleFit.authorize(options)
      .then(authResult => {
        console.warn('Google Fit Auth Result : ', authResult);
        if (authResult.success) {
          console.log('Google Fit Authentication Success ', authResult);
          var googleFitConnectedDate = new Date().toISOString(); //Save the date of authorization
          this.startUsingGoogleFit(); //If user conencts google fit -> start using services
        } else {
          console.warn('Google Fit Authentication Error ', authResult.message);
        }
      })
      .catch(e => {
        console.warn('Authentication Error ', e);
      });
  };

  //Start using Google Fit Services -> Android
  startUsingGoogleFit = () => {
    const stepsOptions = {
      startDate: '2019-10-28T00:00:17.971Z', // required ISO8601Timestamp
      endDate: new Date().toISOString(), // required ISO8601Timestamp
    };
    GoogleFit.getDailyStepCountSamples(stepsOptions)
      .then(res => {
        console.log('Daily steps Count >>> ', res);
      })
      .catch(err => {
        console.warn(err);
      });
  };

  //Connect to Apple HealthKit -> iOS
  connectToAppleHealKit = () => {
    let options = {
      permissions: {
        read: ['Height', 'Weight', 'StepCount', 'DateOfBirth', 'BiologicalSex'],
        write: ['Height', 'Weight', 'StepCount'],
      },
    };

    AppleHealthKit.initHealthKit(options, (err, results) => {
      if (err) {
        console.log('error initializing Healthkit: ', err);
        return;
      }
      this.appleHealthKitActions(); //Do Apple Health Actions
    });
  };

  //All Appkle HealthKit Actions -> ios
  appleHealthKitActions = () => {
    //Get user date of birth
    AppleHealthKit.getDateOfBirth(null, (err, results) => {
      console.log('Date of Birth - ', results);
    });
    //Get user gender
    AppleHealthKit.getBiologicalSex(null, (err, results) => {
      console.log('Gender  - ', results);
    });
  };

  //render plaform specific button for accessing health
  renderHealthConnectButton = () => {
    if (Platform.OS === 'ios') {
      return (
        <View style={styles.buttonContainer}>
          <Button
            title="Connect to Apple HealthKit"
            onPress={() => this.connectToAppleHealKit()}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.buttonContainer}>
          <Button
            title="Connect to Google Fit"
            onPress={() => this.connectToGoogleFit()}
          />
        </View>
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.welcomeText}> Welcome </Text>
          <Text style={styles.infoText}> Your email : {this.state.email}</Text>

          <View style={styles.buttonContainer}>
            <Button
              title="Log Out"
              onPress={() => this.props.logout(this.props.navigation)}
            />
          </View>

          <View style={styles.border}></View>

          {this.renderHealthConnectButton()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 50,
    marginTop: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 20,
    marginTop: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  border: {
    width: ScaleUnits.width,
    height: 5,
    backgroundColor: AppStyles.AppStyles.colorGray,
  },
});

const mapDispatchToProps = dispatch => {
  return {
    logout: navigation => dispatch(logout(navigation)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(Home);
