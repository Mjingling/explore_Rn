'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ListView,
  ScrollView,
  NavigatorIOS
} from 'react-native';

const styles = StyleSheet.create({
  cellfixed:{
    width:100,
    height: 50,
    backgroundColor: '#ffffff'
  },
cell:{
      flex: 1,
      height: 50,
      backgroundColor: '#aaaaaa'
    },
  zhushi:{
    backgroundColor:"#ededed",
    paddingTop:10,
    paddingBottom:10,
  },
  SearchInput:{
    marginTop:20,
    marginBottom:20
  },
  header:{
    height:40,
    paddingTop:10,
    paddingBottom:10,
  },
  container: {
    backgroundColor: '#EEEEEE',
    marginTop:20,
    flexDirection:"column"
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions:{
    textAlign: 'center',
  },
  delText: {
    textAlign: 'center',
    color: 'red',
    margin: 5,
  },
  input:{
    padding:5,
    backgroundColor:"#f4f4f4",
    borderColor:"#ededed",
    borderWidth:1,
    height:40,
    flex:1,
    borderRadius:5
  },
  pd_5:{
    padding:5
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
    justifyContent:"center"
  },
  all_title_wrapper:{
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#ffffff',
    marginTop:10
  },
  all_title:{
    color:'#FF4354',
    fontSize:16,
    textAlign:'center'
  },
  category_nav:{
    flexDirection:'row',
    backgroundColor:'#ffffff',
    marginTop:10,
    borderColor:'#eeeeee',
    borderWidth:1,
  },
  liner_item:{
    flexDirection:'row',
    backgroundColor:'#ffffff',
    borderColor:'#eeeeee',
    borderBottomWidth:1,
    marginBottom:10
  },
  flex_item:{
    flex:1
  },
  topic_title:{
    fontSize:16,
    textAlign:'left',
    borderColor:'red',
    padding:10,
    borderTopWidth:1,
    borderBottomWidth:1
  },
  good_price:{
    color:"#FF4354",
    flex:1,
    fontSize:16
  },
  good_left:{
    color:"#999999",
    flex:1,
    textAlign:'right',
  },
  good_basic:{
    flexDirection:'row',
    padding:5,
    paddingLeft:10,
    paddingRight:10
  },
  good_name:{
    borderColor:'#ededed',
    borderTopWidth:1,
    borderBottomWidth:1
  }
});

var Dimensions=require('Dimensions');

var icon_buy=require('../assets/icon-buy.png');
var icon_center=require('../assets/icon-center.png');

var bg_hot=require('../assets/hot.png');
var bg_new=require('../assets/new.png');

var good_img=require('../assets/img.jpg');
var good_img2=require('../assets/img2.jpg');
var good_img3=require('../assets/img3.jpg');
var good_img4=require('../assets/img4.jpg');

import GoodDetails from './goodDetails';
import PageHeader from './PageHeader';
var HotPage=require('./hotPage');
var NewPage=require('./newPage');
var UserIndex=require('./userIndex');


export default class IndexPp extends Component{

  constructor(props){
    super(props);
    this.state={
      isRefreshing:false,
      dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  componentWillMount(){
    this.fetchData();
  }

  goPage(name){
    const { navigator } = this.props;
    var componentObj={
        name: 'HotPage',
        title:'HotPage',
        component: HotPage
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
    
    if(name=="goodDetails"){
      componentObj={
        name: 'GoodDetails',
        title:'GoodDetails',
        component: GoodDetails
      }
    }

    if(navigator) {
       navigator.push(componentObj);
    }
  }

  

  clickFn(goodId){
    const { navigator } = this.props;
    var  componentObj={
        name: 'GoodDetails',
        title:'GoodDetails',
        component: GoodDetails,
        params: {
          goodId:goodId
        }
      }

    if(navigator) {
       navigator.push(componentObj);
    }
  }

  _setData(datas){
    console.log(datas);
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(datas),
      isRefreshing:false
    });
  }

  fetchData(){

    var goodArr=[
      {
        imgUrl:good_img,
        name:"红印 red seal 黑糖500g*2罐子",
        id:123,
        price:79,
        left:'2/10'
      },
      {
        imgUrl:good_img2,
        name:"MARVIS茉莉薄荷+经典强力薄荷型牙膏",
        id:225,
        price:49,
        left:'4/10'
      },
        {
        imgUrl:good_img3,
        name:"海藻油脑黄金 DHA60粒*2瓶",
        id:223,
        price:389,
        left:'2/10'
      },
      {
        imgUrl:good_img4,
        name:"喜宝 HIPP 有机免疫纯大米米粉4M+400g",
        id:125,
        price:86,
        left:'3/10'
      }
    ];

    var datas=[];
    for(var i=0;i<5;i++){
      var secArr=[];
      secArr.push(goodArr[this.GetRandomNum()]);
      if(i!=4){
         secArr.push(goodArr[this.GetRandomNum()]);
      }


      datas.push(secArr);

    }
    fetch(
      'http://api-test.naduoduo.jinjushu.com/shop/good_list',
      {
        method:'post',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body:'type=101'
      }
    )
    .then(response=>response.json())
    .then(response=>this._setData(response.data))
    
  }

  GetRandomNum(){
    return Math.ceil(Math.random()*3);
  }
  _rowRender(rowData){
    let imgUrl='http://m.naduoduo.jinjushu.com/'+rowData.head_image;
    return (

   <View style={styles.liner_item}>

      <View style={styles.flex_item}>
      <TouchableOpacity onPress={this.clickFn.bind(this,rowData.id)}>
      <View style={styles.topic_item}>
        <Image style={{alignSelf:'center',marginVertical:10,width:150,height:150, resizeMode: Image.resizeMode.stretch}} source={{uri:imgUrl}} />

        <View  style={styles.good_name}>
          <Text style={styles.topic_title}>
            {rowData.name}
          </Text>
        </View>


        <View  style={styles.good_basic}>
          <Text style={styles.good_price}>
            ¥{rowData.money}
          </Text>
          <Text style={styles.good_left}>
            剩余{rowData.can_sale}件
          </Text>
        </View>

      </View>
      </TouchableOpacity>
    </View>
    </View>


    );
  }

     getRowView(rowData){
    if(typeof rowData[1]=='undefined'){
      return (
          <View  style={[styles.flex_item,{borderLeftWidth:1,borderColor:'#ededed'}]}>
        </View>
      );
    }else{
          let imgUrl='http://m.naduoduo.jinjushu.com/'+rowData[1].head_image;
      return (
          <View style={styles.flex_item}>
      <TouchableOpacity onPress={this.clickFn.bind(this,rowData[1].id)}>
      <View style={styles.topic_item}>
        <Image style={{alignSelf:'center',marginVertical:10,width:150,height:150, resizeMode: Image.resizeMode.stretch}} source={{uri:imgUrl}} />

        <View  style={styles.good_name}>
          <Text style={styles.topic_title}>
            {rowData[1].name}
          </Text>
        </View>


        <View  style={styles.good_basic}>
          <Text style={styles.good_price}>
            ¥{rowData[1].money}
          </Text>
          <Text style={styles.good_left}>
            {rowData[1].saled_num}/{rowData[1].can_sale}
          </Text>
        </View>

      </View>
      </TouchableOpacity>
    </View>
      );
    }
   }




  render(){

    var _this=this;
    var leftPart=(function(){
      return (
        <TouchableOpacity></TouchableOpacity>
      );
    })();
    var rightPart=(function(){
      return (
        <TouchableOpacity>
        <Image style={{position:'absolute',right:10,top:0,width:23,marginLeft:10, height: 20, resizeMode: Image.resizeMode.stretch}} source={icon_buy} />
        </TouchableOpacity>
      );
    })();

    return (
      <View style={styles.container}>

      <PageHeader leftPart={leftPart} rightPart={rightPart} pageTitle="优选" clickFn={this.goBack}>
      </PageHeader>


      <View style={{height:Dimensions.get('window').height-110}}>

      <ScrollView
      automaticallyAdjustContentInsets={false}
      >
            <View style={styles.category_nav}>
               <View style={{flex:1}}>
                <TouchableOpacity onPress={this.goPage.bind(this,'hot')} >
                  <Image style={{width:Dimensions.get('window').width/2-1,height: (Dimensions.get('window').width/2-1)*210/374}}  source={bg_hot} />
                </TouchableOpacity>
                </View>
              <View style={{flex:1}}>
                <TouchableOpacity  onPress={this.goPage.bind(this,'new')}>
                  <Image style={{width:Dimensions.get('window').width/2-1,height: (Dimensions.get('window').width/2-1)*210/374,marginLeft:2}} source={bg_new} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.all_title_wrapper}>
              <Text style={styles.all_title}>
                  全部宝贝
              </Text>
            </View>


            <View style={{marginTop:10}}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this._rowRender.bind(this)}
            />
            </View>
    </ScrollView>
     </View>


     </View>

    );
  }

}
