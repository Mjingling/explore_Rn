'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Image
} from 'react-native';

const styles = StyleSheet.create({
   container: {
    backgroundColor: '#EEEEEE',
    marginTop:20,
    flexDirection:"column"
  },
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
  },
  address_item:{
    backgroundColor:"#ffffff",
    marginTop:10,
  },
  address_op:{
    flexDirection:"row",
    padding:10,
    borderColor:"#ededed",
    borderBottomWidth:1
  },
  set_default:{
    flex:1,
    flexDirection:"row"
  },
  icon_text:{
    color:"#FF4354"
  },
  op_btn:{
    width:80,
    flexDirection:"row",
    justifyContent:"flex-end"
  },
  addr_con:{
    padding:10
  },
  icon_14:{
    width:14,
    height:14,
    resizeMode: Image.resizeMode.cover,
    marginRight:10
  },
  paragraph:{
    paddingTop:5,
    paddingBottom:5
  },
  page_header_right:{
    position:"absolute",
    width:80,
    right:10,
    flexDirection:"row",
    justifyContent:"flex-end"
  },
  red_text:{
    color:"#FF4354"
  }
});

module.exports=styles;
