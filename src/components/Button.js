/**
 * Author : Akila Devinda Rathnayaka
 * Copyrights: SAKS Global
 * Version: 
 * Description: Custom Button Component
 * Date: 
 */
 
 import React, { Component } from 'react';
 import { 
     View,
     Text,
     StyleSheet,
     TouchableHighlight
 } from 'react-native';
import { AppStyles } from '../config';
import PropTypes from 'prop-types';

 export default class Button extends Component {
 
     constructor(props) {
         super(props);
     }
 
     render() {
         return (
             <View style={styles.container}>
                <TouchableHighlight style={[styles.buttonContainer, styles.button]} onPress={this.props.onPress}>
                    <Text style={styles.buttonText}>{this.props.title}</Text>
                </TouchableHighlight>
             </View>
         );
     }
 }
 
 const styles = StyleSheet.create({
     container: {
         flex: 1,
     },
     buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:300,
        borderRadius:5,
      },
      button: {
        backgroundColor: "#00b5ec",
      },
      buttonText: {
        color: AppStyles.AppStyles.colorWhite,
        fontFamily:AppStyles.AppStyles.primaryFont,
        fontSize:20,
      }
 });

 Button.propTypes = {
    onPress: PropTypes.func,
    title:PropTypes.string,
}


