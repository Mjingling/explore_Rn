'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Navigator,
  AsyncStorage
}  from 'react-native';

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
    paddingBottom:10,
    backgroundColor:"#ffffff",
    justifyContent:"center",
    flexDirection:"row"
  },
  user_avater:{
    alignSelf:'center',
    width:40,
    height: 40,
    resizeMode: Image.resizeMode.stretch,
    borderRadius:20,
    borderColor:'#ededed',
    borderWidth:1
  },
  user_nikename:{
    textAlign:'left',
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:0
  },
  user_navs:{
    backgroundColor:"#ffffff",
    flexDirection:"row",
    marginTop:1
  },
  nav_item:{
    flex:1,
    flexDirection:"column",
    justifyContent:"center",
    paddingVertical:10,
    borderColor:'#ededed',
    borderRightWidth:1
  },
  nav_text:{
    textAlign:"center",
    paddingVertical:5
  },
  nav_icon:{
    alignSelf:"center",
    marginVertical:10,
    resizeMode: Image.resizeMode.stretch,
    width:30,
    height:30
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
  },option_icon:{
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
  },
  login_out_btn:{
    justifyContent:'center',
    paddingVertical:15,
    alignItems:'center',
    backgroundColor:'#FF4354',
    marginBottom:10,
    marginLeft:10,
    marginRight:10,
    borderRadius:5
  },
  login_out_text:{
    color:'#ffffff'
  }
});

import Dimensions from 'Dimensions';
import icon_back from '../assets/icon-back.png';
import  icon_address from '../assets/icon-adress.png';
import  icon_order from '../assets/icon-order.png';
import  icon_service from '../assets/icon-service.png';
import  icon_arrow from '../assets/icon-arrow.png';
import  good_img from '../assets/img.jpg';
import  icon_medal from '../assets/my_btnicon1.png';
import icon_friend from '../assets/my_btnicon2.png';
import icon_coupon from '../assets/my_btnicon3.png';
import icon_challenge from '../assets/my_btnicon4.png';


import AddressList from './addressList';
import OrderList from './orderList';
import IndexData from './json/index.json';
import NewPage from './newPage';
import TabView from './tabView';
import Login from './login';


export default class UserIndex extends Component{

  static propTypes = {
        goToPage: React.PropTypes.func, // 跳转到对应tab的方法
		activeTab: React.PropTypes.number, // 当前被选中的tab下标
		tabs: React.PropTypes.array, // 所有tabs集合
		tabNames: React.PropTypes.array, // 保存Tab名称
		tabIcons: React.PropTypes.array, // 保存Tab图标
    };  // 注意这里有分号

  constructor(props){
    super(props);
    this.state={
      userInfo:{
        nikename:"狂奔的蜗牛",
        imgsrc:good_img,
        mobile:"15611192643",
        id:123
      },
      isRefreshing:false,
      info:{},
      headimgurl:good_img
    }
  }

  componentWillMount(){
    console.log(this.props.goToPage);

    console.log(this.props.activeTab);

  }

  componentWillReceiveProps(nextProps) {
    console.log('will---');
}

  componentDidMount(){
    this.setState({
      isRefreshing:true
    });
   this._setData(IndexData.data);
  }

  _setData(data){
    this.setState({
      userInfo:data.user_info,
      isRefreshing:false,
      info:data
    });
  }

  goBack(name){
    console.log(name);
    const { navigator } = this.props;
    if(navigator) {
       navigator.pop();
    }
  }

  logOut(){
    AsyncStorage.removeItem("isLogin");
    //this.goPage('new');
    //const {goToPage}=this.props;
    //goToPage(1);
    //replace
        const { navigator } = this.props;
    var componentObj={
        name: 'TabView',
        title:'TabView',
        component: TabView
    };
    if(navigator){
      navigator.replace(componentObj);
    }
  }

  goPage(name){
    const { navigator } = this.props;
    var componentObj={
        name: 'AddressList',
        title:'AddressList',
        component: AddressList
    };

    if(name=='new'){
      componentObj={
        name: 'NewPage',
        title:'NewPage',
        component: NewPage
      }
    }

    if(name=="userindex"){
      componentObj={
        name: 'userindex',
        title:'userindex',
        component: UserIndex
      }
    }


    if(name=="orderlist"){
      componentObj={
        name: 'orderlist',
        title:'orderlist',
        component: OrderList
      }
    }

    if(name=="login"){
      componentObj={
        name: 'Login',
        title:'Login',
        component: Login
      }
    }



    if(navigator) {
       navigator.push(componentObj);
    }
  }

  render(){
    return (
      <View style={styles.container}>

      <View style={styles.page_header}>
          <View style={styles.page_title_wrapper}>
             <Text style={styles.page_title}>我的</Text>
          </View>
      </View>


      <View style={{height:Dimensions.get('window').height-110}}>

      <ScrollView
      automaticallyAdjustContentInsets={false}
      >
      <View style={styles.user_info}>
      {/*<Image style={styles.user_avater} source={{uri:this.state.userInfo.headimgurl}} />*/}
      <View style={{width:40,height:40,marginVertical:5,marginLeft:15,marginRight:15}}>
        <Image style={styles.user_avater} source={this.state.headimgurl}/>
      </View>
        <View style={{flex:1}}>
              <Text style={styles.user_nikename}>{this.state.userInfo.nickname}</Text>
              <Text style={styles.user_nikename}>手机:{this.state.userInfo.mobile}</Text>
         </View>
      </View>
      <View style={{flex:1,paddingVertical:10,paddingLeft:20,paddingRight:15,borderColor:'#ededed',
      borderBottomWidth:1,backgroundColor:"#ffffff",flexDirection:"row",alignItems:"flex-end"}}>
        <Text  style={{color:'#666'}} >总资产:</Text>
        <Text  style={{color:'#ff3d3e',fontSize:20}} >  ¥{this.state.info.total_money}</Text>
      </View>
      <View style={{flexDirection:'row',paddingLeft:15,paddingRight:15,backgroundColor:"#FDFDFD"}}>
            <View style={{flex:1,paddingVertical:10}}>
              <Text  style={{color:'#999999'}} >理财中:</Text>
              <Text  style={{color:'#4a6c9f',fontSize:16}} >¥{this.state.info.investing_money}</Text>
            </View>
          <View style={{flex:1,paddingVertical:10}}>
            <Text  style={{color:'#999999'}} >累计已赚:</Text>
            <Text  style={{color:'#4a6c9f',fontSize:16}} >¥{this.state.info.earned_money}</Text>
          </View>
      </View>
    <View style={{flexDirection:'row',paddingLeft:15,paddingRight:15,backgroundColor:"#FDFDFD"}}>
          <View style={{flex:1,paddingVertical:10}}>
            <Text  style={{color:'#999999'}} >闲置中:</Text>
            <Text  style={{color:'#4a6c9f',fontSize:16}} >¥{this.state.info.money}</Text>
          </View>
          <View style={{flex:1,paddingVertical:10}}>
            <Text  style={{color:'#999999'}} >待收收益:</Text>
            <Text  style={{color:'#4a6c9f',fontSize:16}} >¥{this.state.info.investing_interest}</Text>
          </View>
      </View>

      <View style={styles.user_navs}>
        <TouchableOpacity style={styles.nav_item} onPress={this.goPage.bind(this,'address-list')}>
          <Image style={[styles.nav_icon]} source={icon_challenge} />
           <Text style={styles.nav_text}>理财挑战</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={styles.nav_item} onPress={this.goPage.bind(this,'orderlist')}>
          <Image style={styles.nav_icon} source={icon_coupon} />
           <Text style={styles.nav_text}>红包</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={styles.nav_item} onPress={this.goPage.bind(this,'index')}>
           <Image style={styles.nav_icon} source={icon_medal} />
           <Text style={styles.nav_text}>勋章</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={styles.nav_item} onPress={this.goPage.bind(this,'index')}>
           <Image style={styles.nav_icon} source={icon_friend} />
           <Text style={styles.nav_text}>桔友圈</Text>
        </TouchableOpacity>
     </View>

      <View style={styles.user_options}>
      <TouchableOpacity style={styles.option_item} onPress={this.goPage.bind(this,'address-list')}>
        <Image style={[styles.option_icon,{width:16}]} source={icon_address} />
         <Text style={styles.option_text}>收货地址</Text>
         <Image style={styles.icon_arrow} source={icon_arrow} />
      </TouchableOpacity>
      <TouchableOpacity  style={styles.option_item} onPress={this.goPage.bind(this,'orderlist')}>
        <Image style={styles.option_icon} source={icon_order} />
         <Text style={styles.option_text}>订单管理</Text>
         <Image style={styles.icon_arrow} source={icon_arrow} />
      </TouchableOpacity>
      <TouchableOpacity  style={styles.option_item} onPress={this.goPage.bind(this,'index')}>
         <Image style={styles.option_icon} source={icon_service} />
         <Text style={styles.option_text}>售后服务</Text>
         <Image style={styles.icon_arrow} source={icon_arrow} />
      </TouchableOpacity>
     </View>


      <TouchableOpacity  style={styles.login_out_btn} onPress={this.logOut.bind(this)}>
         <Text style={styles.login_out_text}>退出登录</Text>
      </TouchableOpacity>

    </ScrollView>
     </View>


     </View>

    );
  }

}
