'use strict';
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';

import loading_img from '../assets/loading.gif';
const Dimensions=require('Dimensions');
const w_width=Dimensions.get('window').width;
const w_height=Dimensions.get('window').height;

const styles=StyleSheet.create({
    load_rapper:{
        flexDirection:'row',
        flex:1,
        justifyContent:'center',
        position:'absolute',
        top:w_height/2-50,
        zIndex:99,
        alignItems:'center'
    },
    load_con:{
        flexDirection:'row',
        flex:1,
        justifyContent:'center',
        zIndex:99,
        alignItems:'center',
        alignSelf:'center'
    },
    loading_img:{
        width:100,
        height:100,
        resizeMode:Image.resizeMode.contain,
        alignSelf:'center'
    }
});
export default class Loading extends Component{
  constructor(props){
      super(props);
    }
      render() {
      return (
        <View style={styles.load_rapper}>    
        <View style={styles.load_con}>
            <Image source={loading_img} style={styles.loading_img}/>
        </View>
        </View>
      )
    }
}