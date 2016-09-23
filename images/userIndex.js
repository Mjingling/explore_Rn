/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  navigator
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
  user_info:{
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:"#ffffff",
    justifyContent:"center"
  },
  user_avater:{
    alignSelf:'center',
    marginVertical:10,
    width:80,
    height: 80,
    resizeMode: Image.resizeMode.stretch
  },
  user_nikename:{
    textAlign:'center',
    paddingTop:10,
    paddingBottom:10
  },
  user_options:{
    marginVertical:10,
    backgroundColor:"#ffffff"
  },
  option_item:{
    flexDirection:'row',
    paddingTop:20,
    paddingBottom:20,
    borderBottomWidth:1,
    borderBottomColor:'#ededed',
    paddingLeft:20,
    paddingRight:20
  },
  option_text:{
    textAlign:'left',
    flex:1,
    marginTop:3
  }
  ,option_icon:{
    width:20,
    height:20,
    marginRight:10,
    resizeMode: Image.resizeMode.stretch
  },icon_arrow:{
    width:12,
    height:20,
    resizeMode: Image.resizeMode.stretch
  },change_btn:{
    backgroundColor:'#FF4354',
    width:100,
    paddingVertical:5,
    alignSelf:'center',
    borderRadius:5
  }
});

var Dimensions=require('Dimensions');

var icon_back=require('./images/icon-back.png');
var icon_address=require('./images/icon-adress.png');
var icon_order=require('./images/icon-order.png');
var icon_service=require('./images/icon-service.png');
var icon_arrow=require('./images/icon-arrow.png');
var good_img=require('./images/img.jpg');

var UserIndex=React.createClass({
  componentWillMount:function(){
  },
  getInitialState:function(){
    return {
      userInfo:{
        nikename:"狂奔的蜗牛",
        imgsrc:good_img,
        mobile:"15611192643",
        id:123
      }
    }
  }
  ,
  goBack:function(name){
    console.log(name);
    const { navigator } = this.props;
    if(navigator) {
       navigator.pop();
    }
  }
  ,

  render:function(){
    return (
      <View style={styles.container}>

      <View style={styles.page_header}>
          <TouchableOpacity onPress={this.goBack.bind(this,'index')}>
            <Image style={{position:'absolute',left:0,top:0,width:23,marginLeft:10, height: 20, resizeMode: Image.resizeMode.stretch}} source={icon_back} />
          </TouchableOpacity>
          <View style={styles.page_title_wrapper}>
             <Text style={styles.page_title}>个人中心</Text>
          </View>
      </View>


      <View style={{height:Dimensions.get('window').height-60}}>

      <ScrollView
      automaticallyAdjustContentInsets={false}
      >
      <View style={styles.user_info}>
            <Image style={styles.user_avater} source={this.state.userInfo.imgsrc} />
            <Text style={styles.user_nikename}>{this.state.userInfo.nikename}</Text>
            <Text style={styles.user_nikename}>已绑定 {this.state.userInfo.mobile}</Text>
        <TouchableOpacity style={styles.change_btn} onPress={this.goBack.bind(this,'index')}>
          <Text style={{color:"#ffffff",textAlign:'center'}}>更改手机号</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.user_options}>
      <TouchableOpacity style={styles.option_item} onPress={this.goBack.bind(this,'index')}>
        <Image style={[styles.option_icon,{width:16}]} source={icon_address} />
         <Text style={styles.option_text}>收货地址</Text>
         <Image style={styles.icon_arrow} source={icon_arrow} />
      </TouchableOpacity>
      <TouchableOpacity  style={styles.option_item} onPress={this.goBack.bind(this,'index')}>
        <Image style={styles.option_icon} source={icon_order} />
         <Text style={styles.option_text}>订单管理</Text>
         <Image style={styles.icon_arrow} source={icon_arrow} />
      </TouchableOpacity>
      <TouchableOpacity  style={styles.option_item} onPress={this.goBack.bind(this,'index')}>
         <Image style={styles.option_icon} source={icon_service} />
         <Text style={styles.option_text}>售后服务</Text>
         <Image style={styles.icon_arrow} source={icon_arrow} />
      </TouchableOpacity>
     </View>
    </ScrollView>
     </View>


     </View>

    );
  }

});

module.exports=UserIndex;
