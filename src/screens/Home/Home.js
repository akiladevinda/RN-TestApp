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
    BackHandler
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Button } from '../../components';
import { connect } from 'react-redux';
import { 
    logout ,
} from '../../redux/actions/loginActions';

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

    render() {
        return (
            <View style={styles.container}>
            <ScrollView>

                <Text style={styles.welcomeText}> Welcome </Text>
                <Text style={styles.infoText}> Your email : {this.state.email}</Text>
                <View style={styles.buttonContainer}>
                <Button title='Log Out' onPress={ ()=> this.props.logout( this.props.navigation)}/>
                </View>
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
       alignSelf:'center',
       marginTop:40,
    }
});

const mapDispatchToProps = (dispatch) => {
    return{
        logout : (navigation) => dispatch(logout(navigation)),
    };
};

export default connect(null,mapDispatchToProps)(Home);