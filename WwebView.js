'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop:22,
    backgroundColor: '#ffffff',
    padding:0
  }
});

var Dimensions=require('Dimensions');
var w_width=Dimensions.get('window').width;
var w_height=Dimensions.get('window').height;

class WwebView extends Component{

  render(){
    return (
      <View style={styles.container}>
          <WebView
            source={{uri:"http://m.jinjucaifu.cn/"}}
            style={{width:w_width,height:w_height-22}}
            >
          </WebView>
      </View>
    );
  }

}

module.exports=WwebView;
