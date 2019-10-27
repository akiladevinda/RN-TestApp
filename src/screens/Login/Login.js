/**
 * Author : Akila Devinda Rathnayaka
 * Copyrights: SAKS Global
 * Version: 
 * Description: Login User Screen
 * Date: 
 */


import React, { Component } from 'react';
import { 
    StyleSheet,
    Text,
    View,
    TextInput,
} from 'react-native';
import { Button , Loading } from '../../components';
import { AppStyles, ScaleUnits } from '../../config';
import { connect } from 'react-redux';
import { 
    login ,
    userAuthError,
    loginHasError
} from '../../redux/actions/loginActions';
import Spinner from 'react-native-loading-spinner-overlay';
import Dialog from "react-native-dialog";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email:null,
            password:null,
        }
    }

    componentDidMount(){
        console.log('Login componentDidMount');
    }

    //User login button click event
    loginClickListner(){
        let { email, password } = this.state;
        let navigation = this.props.navigation;
        this.props.login(email,password,navigation);
    }

    render() {
        return (
            <View style={styles.container}>
            <Spinner
            visible={this.props.isLoading}
            cancelable={false}
            />
            <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    placeholder="Email"
                    keyboardType="email-address"
                    underlineColorAndroid='transparent'
                    onChangeText={(email) => this.setState({email})}/>
            </View>
            
            <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    placeholder="Password"
                    secureTextEntry={true}
                    underlineColorAndroid='transparent'
                    onChangeText={(password) => this.setState({password})}/>
            </View>

            <Button title= 'Log In' onPress = { ()=> this.loginClickListner()}/>

            </View>

                <View>
                <Dialog.Container visible={this.props.authError}>
                <Dialog.Title>Invalid Credentials</Dialog.Title>
                <Dialog.Description>
                    Please check your email and password.
                </Dialog.Description>
                <Dialog.Button label="Ok" onPress={ ()=> this.props.userAuthError(false)}/>
                </Dialog.Container>
                </View>

                <View>
                <Dialog.Container visible={this.props.hasError}>
                <Dialog.Title>Error Occured</Dialog.Title>
                <Dialog.Description>
                    Please try again later.
                </Dialog.Description>
                <Dialog.Button label="Ok" onPress={ ()=> this.props.loginHasError(false)}/>
                </Dialog.Container>
                </View>
                    
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    formContainer:{
        marginTop:ScaleUnits.width/1.5
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:5,
        borderBottomWidth: 1,
        width:300,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems:'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
});

const mapStateToProps = (state) => {
    return{
        isLogged:state.loginReducer.isLogged,
        hasError:state.loginReducer.hasError,
        isLoading:state.loginReducer.isLoading,
        authError:state.loginReducer.authError,
    };
};

const mapDispatchToProps = (dispatch) => {
    return{
        login : ( email, password, navigation) => dispatch(login(email, password, navigation)),
        userAuthError: (value) => dispatch(userAuthError(value)),
        loginHasError: (value) => dispatch(loginHasError(value)),

    };
};

export default connect( mapStateToProps , mapDispatchToProps )(Login);