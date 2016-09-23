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
  navigator
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
    justifyContent:"center",
    marginLeft:80,
    marginRight:80
  },
  liner_item:{
    flexDirection:'row',
    backgroundColor:'#ffffff',
    borderColor:'#eeeeee',
    borderBottomWidth:1,
  },
  flex_item:{
    flex:1
  },
  topic_title:{
    fontSize:16,
    textAlign:'left',
    borderTopColor:'red',
    padding:10,
    borderTopWidth:1
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
    borderTopColor:'#ededed',
    borderTopWidth:1
  }
});

var Dimensions=require('Dimensions');

var icon_back=require('./images/icon-back.png');
var good_img=require('./images/img.jpg');
var good_img2=require('./images/img2.jpg');
var good_img3=require('./images/img3.jpg');
var good_img4=require('./images/img4.jpg');



class PageHeader extends Component{
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


export default class Message extends Component{

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

    clickFn(id){
      console.log(id);
    }

    _setData(datas){
      this.setState({
        dataSource:this.state.dataSource.cloneWithRows(datas),
        isRefreshing:false
      });
    }

    goBack(){
      //console.log(name);
      const { navigator } = this.props;
      if(navigator) {
         navigator.pop();
      }
    }

    fetchData(){

      var goodArr=[
        {
          name:"恭喜你获得了优选送出的精美礼品!",
          id:123
        },
        {
          name:"优选,为您精选上等的货,走您最想走的路~",
          id:225
        },
          {
          name:"骑着海豚去旅行给您发来消息",
          id:223
        },
        {
          name:"欢迎加入优选的大家庭~",
          id:125
        }
      ];

      var datas=[];
      for(var i=0;i<25;i++){
        var secArr=[];
        secArr.push(goodArr[this.GetRandomNum()]);
        if(i!=4){
           secArr.push(goodArr[this.GetRandomNum()]);
        }

        datas.push(secArr);

      }
      this._setData(datas)
    }

    GetRandomNum(){
      return Math.ceil(Math.random()*3);
    }

    _rowRender(rowData){
      return (
        <View style={styles.liner_item}>
          <TouchableOpacity onPress={this.clickFn.bind(this,rowData[0].id)}>
              <Text style={styles.topic_title}>
                {rowData[0].name}
              </Text>
          </TouchableOpacity>
        </View>
      );
    }

    render(){
      var _this=this;
      var rightPart=(function(){
        return (
          <TouchableOpacity>
          </TouchableOpacity>
        );
      })();

      return (
        <View style={styles.container}>
        <PageHeader  rightPart={rightPart} pageTitle="消息" clickFn={this.goBack}>
        </PageHeader>


        <View style={{height:Dimensions.get('window').height-110}}>
          <ScrollView
          automaticallyAdjustContentInsets={false}
          >
            <View>
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
