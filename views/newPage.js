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


class NewPage extends Component{

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
      this._setData(datas)
    }

    GetRandomNum(){
      return Math.ceil(Math.random()*3);
    }

    getRowView(rowData){
      if(typeof rowData[1]=='undefined'){
        return (
            <View  style={[styles.flex_item,{borderLeftWidth:1,borderColor:'#ededed'}]}>
          </View>
        );
      }else{
        return (
            <View  style={[styles.flex_item,{borderLeftWidth:1,borderColor:'#ededed'}]}>
            <TouchableOpacity onPress={this.clickFn.bind(this,rowData[1].id)}>
            <View style={styles.topic_item}>
              <Image style={{alignSelf:'center',marginVertical:10,width:150,height:150, resizeMode: Image.resizeMode.stretch}} source={rowData[1].imgUrl}/>

              <View  style={styles.good_name}>
                <Text style={styles.topic_title}>
                  {rowData[1].name}
                </Text>
              </View>

              <View  style={styles.good_basic}>
                <Text style={styles.good_price}>
                  ¥{rowData[1].price}
                </Text>
                <Text style={styles.good_left}>
                  {rowData[1].left}
                </Text>
              </View>

            </View>
            </TouchableOpacity>
          </View>
        );
      }
     }
    _rowRender(rowData){
      var rowData2=this.getRowView(rowData);

      return (

    <View style={styles.liner_item}>

        <View style={styles.flex_item}>
          <TouchableOpacity onPress={this.clickFn.bind(this,rowData[0].id)}>
          <View style={styles.topic_item}>
            <Image style={{alignSelf:'center',marginVertical:10,width:150,height:150, resizeMode: Image.resizeMode.stretch}} source={rowData[0].imgUrl} />

            <View  style={styles.good_name}>
              <Text style={styles.topic_title}>
                {rowData[0].name}
              </Text>
            </View>


            <View  style={styles.good_basic}>
              <Text style={styles.good_price}>
                ¥{rowData[0].price}
              </Text>
              <Text style={styles.good_left}>
                {rowData[0].left}
              </Text>
            </View>

          </View>
          </TouchableOpacity>
      </View>

      {rowData2}

  </View>


      );
    }

    render(){
      var _this=this;
      var leftPart=(function(){
        return (
          <TouchableOpacity  onPress={_this.goBack.bind(_this,'index')}>
            <Image style={{position:'absolute',left:0,top:0,width:23,marginLeft:10, height: 20, resizeMode: Image.resizeMode.stretch}} source={icon_back} />
          </TouchableOpacity>
        );
      })();
      var rightPart=(function(){
        return (
          <TouchableOpacity>
          </TouchableOpacity>
        );
      })();

      return (
        <View style={styles.container}>
        <PageHeader leftPart={leftPart} rightPart={rightPart} pageTitle="新品上市" clickFn={this.goBack}>
        </PageHeader>


        <View style={{height:Dimensions.get('window').height-60}}>
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

module.exports=NewPage;
