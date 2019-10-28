/**
 * Author : Akila Devinda Rathnayaka
 * Copyrights: SAKS Global
 * Version: 
 * Description: Home Screen
 * Date: 
 */


import React, { Component } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    ScrollView,
    BackHandler,
    Platform
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Button } from '../../components';
import { connect } from 'react-redux';
import { 
    logout ,
} from '../../redux/actions/loginActions';
import { ScaleUnits, AppStyles } from '../../config';
import GoogleFit, { Scopes } from 'react-native-google-fit'

const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ_WRITE,
      Scopes.FITNESS_BODY_READ_WRITE,
    ],
}


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email:''
        }
    }

    componentDidMount(){
        console.log('Home componentDidMount')

        //Make async key to manage if the application already lauched or not -> 
        //If the back end connected we can use end authentication 
        AsyncStorage.setItem('AppLaunched', JSON.stringify(true)); 

        //Get the user logged email from async storage and set it to local state
        this.getUserEmail().then((Async_Email) => {
            let user_email = JSON.parse(Async_Email)
            console.log('Async User Email : ',user_email)
            this.setState({email:user_email})
        })

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonPress);
    }

    //Get user email from async storage
    getUserEmail = async () => {
        const Async_Email = await AsyncStorage.getItem('Async_Email');
        return Async_Email;
    }

    //Handle android hardware back press -> Not using in ios
    handleBackButtonPress = () => {
        BackHandler.exitApp();
        return true;
    }

    //Connection to Google Fit
    connectToGoogleFit = () => {

        GoogleFit.authorize(options)
        .then(authResult => {
          if (authResult.success) {
            console.log('Google Fit Authentication Success ' , authResult)
          } else {
            console.warn('Google Fit Authentication Error ',authResult.message)
          }
        })
        .catch((e) => {
          console.warn('Authentication Error ',e)
        })
    }

    //render plaform specific button for accessing health
    renderHealthConnectButton = () => {
        if(Platform.OS === 'ios'){
            return(
                <View style={styles.buttonContainer}>
                <Button title='Connect to Apple HealthKit' onPress={ ()=> this.props.logout( this.props.navigation)}/>
                </View>
                );
        }else{
            return(
                <View style={styles.buttonContainer}>
                <Button title='Connect to Google Fit' onPress={ ()=> this.connectToGoogleFit()}/>
                </View>
                );
        }
    }

    render() {
        return (
            <View style={styles.container}>
            <ScrollView>

                <Text style={styles.welcomeText}> Welcome </Text>
                <Text style={styles.infoText}> Your email : {this.state.email}</Text>
               
                <View style={styles.buttonContainer}>
                <Button title='Log Out' onPress={ ()=> this.props.logout( this.props.navigation)}/>
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
    welcomeText:{
        fontSize:50,
        marginTop:30,
        textAlign:'center',
        fontWeight:'bold'
    },
    infoText:{
        fontSize:20,
        marginTop:30,
        textAlign:'center'
    },
    buttonContainer:{
    alignItems:'center',
       marginTop:40,
    },
    border:{
        width:ScaleUnits.width,
        height:5,
        backgroundColor:AppStyles.AppStyles.colorGray
    }
});

const mapDispatchToProps = (dispatch) => {
    return{
        logout : (navigation) => dispatch(logout(navigation)),
    };
};

export default connect(null,mapDispatchToProps)(Home);