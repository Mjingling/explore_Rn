'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Navigator,
  TextInput,
  AsyncStorage,
  Alert
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
  input:{
    backgroundColor:"#ffffff",
    borderWidth:1,
    borderColor:"#ededed",
    height:40,
    paddingLeft:10,
    paddingRight:10
  },
  button:{
    backgroundColor:'#ff7a82',
    justifyContent:'center',
    alignItems:"center",
    padding:15,
    margin:20,
    borderRadius:5
  },
  button_text:{
      color:'#ffffff',
      textAlign:'center'
  },
  order_img:{
    width:50
  },
  pro_img:{
    width:50,
    height:50,
    resizeMode:Image.resizeMode.stretch
  },
  order_text:{
    flex:1,
    paddingLeft:10
  },
  line_height_15:{
    lineHeight:20
  }
});

import Dimensions from 'Dimensions';
import icon_back from './images/icon-back.png';
import Toast from 'react-native-root-toast';

export default class Login extends Component{

  constructor(props){
    super(props);
    this.state={
        username:"",
        pwd:""
    }
  }

  componentWillMount(){
  }

  goBack(name){
    console.log(name);
    const { navigator } = this.props;
    if(navigator) {
       navigator.pop();
    }
  }

  showToast(message){
    let toast = Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.CENTER,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: () => {
        // calls on toast\`s appear animation start
    },
    onShown: () => {
        // calls on toast\`s appear animation end.
    },
    onHide: () => {
        // calls on toast\`s hide animation start.
    },
    onHidden: () => {
        // calls on toast\`s hide animation end.
    }
    });

  }

  doLogin(){
    if(this.state.username=="admin"&&this.state.pwd=="123456"){
      var that=this;
      AsyncStorage.setItem("isLogin","yes",function(err){
        if(err){
          console.log("sava err");
        }else{
          console.log("save success");
          that.goBack('index');
        }
      });

    }else{
      // Alert.alert(
      //       '提示',
      //       '用户名或密码错误',
      //       [
      //         {text: '确定', onPress: () => console.log('OK Pressed!')},
      //       ]
      // )
      this.showToast('用户名或密码错误');
    }

  }

  render(){
    return (
      <View style={styles.container}>

      <View style={styles.page_header}>
          <TouchableOpacity onPress={this.goBack.bind(this,'index')}>
            <Image style={{position:'absolute',left:0,top:0,width:23,marginLeft:10, height: 20, resizeMode: Image.resizeMode.stretch}} source={icon_back} />
          </TouchableOpacity>
          <View style={styles.page_title_wrapper}>
             <Text style={styles.page_title}>登录</Text>
          </View>
      </View>
      <View style={{marginTop:10}}>
         <TextInput style={styles.input} placeholder="邮箱/手机号" value={this.state.username} onChangeText={(username) => this.setState({username})}></TextInput>
         <TextInput style={styles.input} password={true} placeholder="密码"  value={this.state.pwd} onChangeText={(pwd) => this.setState({pwd})}></TextInput>
     </View>
     <TouchableOpacity style={styles.button} onPress={this.doLogin.bind(this)}>
            <Text style={styles.button_text}>确认登录</Text>
      </TouchableOpacity>
     </View>

    );
  }

}
