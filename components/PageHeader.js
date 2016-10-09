'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

export default class PageHeader extends Component{
  render(){
    var leftPart=this.props.leftPart;
    var rightPart=this.props.rightPart;

    return (
      <View style={styles.page_header}>
          {leftPart}
          <View style={styles.page_title_wrapper}>
             <Text style={styles.page_title}>{this.props.pageTitle}</Text>
          </View>
          {rightPart}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  page_header:{
    flexDirection:'row',
    backgroundColor:'#ffffff',
    paddingTop:10,
    paddingBottom:10,
    borderTopColor:'#eeeeee',
    borderTopWidth:1,
    borderBottomColor:'#eeeeee',
    borderBottomWidth:1,
    height:40
  },
  page_title:{
    textAlign:'center',
    flex:1,
    fontSize:16
  },
  page_title_wrapper:{
    flex:1,
    paddingTop:0,
    paddingBottom:0,
    justifyContent:"center",
    marginLeft:80,
    marginRight:80
  }
});