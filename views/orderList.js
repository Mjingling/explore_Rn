'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  navigator,
  ListView
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
  order_item:{
    backgroundColor:"#ffffff",
    marginTop:10
  },
  order_state:{
    borderBottomColor:"#ededed",
    borderBottomWidth:1,
    padding:15
  },
  order_info:{
    flexDirection:"row",
    padding:15
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

var Dimensions=require('Dimensions');

var icon_back=require('./images/icon-back.png');
var icon_address=require('./images/icon-adress.png');
var icon_order=require('./images/icon-order.png');
var icon_service=require('./images/icon-service.png');
var icon_arrow=require('./images/icon-arrow.png');
var good_img=require('./images/img.jpg');

class OrderList extends Component{

  constructor(props){
    super(props);
    var ds=new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state={
      dataSet:ds,
      orderList:[],
      page_num:0,
      isloading:false,
      dataSource:ds.cloneWithRows([])
    }
  }

  componentWillMount(){
    console.log("111111111");
    this.setState({
      isloading:true
    });
    let orderList=[];
    for(let i=0;i<10;i++){
      orderList.push({
        id:"00"+i,
        name:"ICA50%水果国人燕麦片750g 等商品",
        list:["a","b","c"],
        totalMoney:456+i,
        orderStatus:"00901"
      });
    }
    this.setState({
      page_num:1,
      orderList:orderList,
      isloading:false,
      dataSource:this.state.dataSet.cloneWithRows(orderList)
    });
  }


  loadMore(){
    console.log("00000000000000");
    if(!this.state.isloading){
      if(this.state.page_num>6){
        alert("没有更多了")
      }else{
        this.setState({
          isloading:true
        });

        let orderList=[];

        let startIndex=this.state.page_num*10;
        let endIndex=this.state.page_num*10+10;
        for(let i=startIndex;i<endIndex;i++){
          orderList.push({
            id:"00"+i,
            name:"ICA50%水果国人燕麦片750g 等商品",
            list:["a","b","c"],
            totalMoney:456+i,
            orderStatus:"00901"
          });
        }

        let newData=this.state.orderList.concat(orderList);
        //console.log(newData);
        this.setState({
          isloading:false,
          page_num:this.state.page_num+1,
          orderList:newData,
          dataSource:this.state.dataSet.cloneWithRows(newData)
        });
      }
    }
  }

  goBack(name){
    console.log(name);
    const { navigator } = this.props;
    if(navigator) {
       navigator.pop();
    }
  }

_rowRender(rowData){

  var stateText=function() {
    let text="";
    switch(rowData.orderStatus){
      case "00901":
      text="未发货"
      break;
      case "00902":
      text="已发货"
      break;
      case "00903":
      text="配送中"
      break;
      case "00904":
      text="已收货"
      break;
    }
    return text;
  }();

  return (
    <View style={styles.order_item}>
      <View style={styles.order_state} >
         <Text>订单状态 {stateText}</Text>
      </View>
      <View style={styles.order_info}>
         <View style={styles.order_img}>
         <Image  style={styles.pro_img} source={good_img} />
         </View>

         <View style={styles.order_text}>
         <Text style={styles.line_height_15}>{rowData.name}</Text>
         <Text style={styles.line_height_15}>共{rowData.list.length}件  合计:${rowData.totalMoney}</Text>
         </View>
      </View>
      <View style={styles.order_state} >
         <Text>订单id {rowData.id}</Text>
      </View>
    </View>
  )
}


  render(){
    return (
      <View style={styles.container}>

      <View style={styles.page_header}>
          <TouchableOpacity onPress={this.goBack.bind(this,'index')}>
            <Image style={{position:'absolute',left:0,top:0,width:23,marginLeft:10, height: 20, resizeMode: Image.resizeMode.stretch}} source={icon_back} />
          </TouchableOpacity>
          <View style={styles.page_title_wrapper}>
             <Text style={styles.page_title}>订单管理</Text>
          </View>
      </View>


      <View style={{height:Dimensions.get('window').height-60}}>
         <ListView
        dataSource={this.state.dataSource}
        renderRow={this._rowRender.bind(this)}
        onEndReached={this.loadMore.bind(this)}
        onEndReachedThreshold={20}
        renderFooter={this.loadMore.bind(this)}
         ></ListView>
        }
        }
     </View>


     </View>

    );
  }

}

module.exports=OrderList;
