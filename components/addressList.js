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

var Dimensions=require('Dimensions');
const icon_back=require('../assets/icon-back.png');
const icon_delete=require('../assets/icon-delete.png');
const icon_edit=require('../assets/icon-edit.png');
const icon_selectoff=require('../assets/icon-selectoff.png');
const icon_selecton=require('../assets/icon-selecton.png');
const styles=require('./styles');
import AddAddress from './addAddress';
import PageHeader from './PageHeader';
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');

export default class AddressList extends Component{

  constructor(props){
    var ds=new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    var addressList=[
      {
        isDefault:true,
        name:"唐三藏",
        mobile:"15622222222",
        address:"东土大唐,浙江海宁人",
        id:123
      },
      {
        isDefault:false,
        name:"孙悟空",
        mobile:"15622222222",
        address:"花果山水帘洞齐天大圣",
        id:456
      },
      {
        isDefault:false,
        name:"猪八戒",
        mobile:"15622222222",
        address:"高老庄,玉皇大帝座下天蓬元帅",
        id:789
      },
      {
        isDefault:false,
        name:"沙和尚",
        mobile:"15622222222",
        address:"流沙河,玉皇大帝座下卷帘大将",
        id:785
      },{
        isDefault:true,
        name:"唐三藏",
        mobile:"15622222222",
        address:"东土大唐,浙江海宁人",
        id:123
      },
      {
        isDefault:false,
        name:"孙悟空",
        mobile:"15622222222",
        address:"花果山水帘洞齐天大圣",
        id:456
      },
      {
        isDefault:false,
        name:"猪八戒",
        mobile:"15622222222",
        address:"高老庄,玉皇大帝座下天蓬元帅",
        id:789
      },
      {
        isDefault:false,
        name:"沙和尚",
        mobile:"15622222222",
        address:"流沙河,玉皇大帝座下卷帘大将",
        id:785
      },
    ];
    super(props);
    this.state={
      dataSet:ds,
      dataSource:ds.cloneWithRows(addressList),
      addressList:addressList
    }
  }

  componentWillMount(){
  }

    componentDidMount(){
       var _self = this;
      RCTDeviceEventEmitter.addListener('add_address',function(newAdd){
        let addressList=_self.state.addressList;
        addressList.push(newAdd);
         _self.setState({
          addressList : addressList,
          dataSource:_self.state.dataSet.cloneWithRows(addressList)
         })
      })
  }

  //返回上一个界面
  goBack(name){
    console.log(name);
    const { navigator } = this.props;
    if(navigator) {
       navigator.pop();
    }
  }

    //返回上一个界面
  goAdd(){
    const { navigator } = this.props;

    var componentObj={
        name: 'AddAddress',
        title:'AddAddress',
        component: AddAddress
    };
    if(navigator) {
       navigator.push(componentObj);
       //navigator.popToRoute(componentObj);
    }
  }

  clickFn(isDefault){
    console.log(isDefault);
  }

  //某个地址设置为默认
  setDefault(addrid){
    let addressList=this.state.addressList;
    for(let i=0;i<addressList.length;i++){
      if(addressList[i].id==addrid){
        addressList[i].isDefault=true;
      }else {
        addressList[i].isDefault=false;
      }
    }

    this.refreshAddress(addressList);

  }

  //删除地址
  delAddr(addrid){
    let addressList=this.state.addressList;
    let delIndex=-1;
    for(let i=0;i<addressList.length;i++){
      if(addressList[i].id==addrid){
        delIndex=i;
      }
    }

    addressList.splice(delIndex,1);

    this.refreshAddress(addressList);
  }

  //跳转到编辑页面
  editAddr(addrid){
        let newAdd={
        isDefault:false,
        name:"观察者模式添加",
        mobile:"15622222222",
        address:"流沙河,玉皇大帝座下卷帘大将",
        id:562
      };
    RCTDeviceEventEmitter.emit('add_address',newAdd);
  }

  //刷新地址列表
  refreshAddress(addressList){
    this.setState({
      addressList:addressList,
      dataSource:this.state.dataSet.cloneWithRows(addressList)
    });
  }

  //listView 单个条目生成函数
  _rowRender(rowData){
    var _this=this;
    return (
      <View style={styles.address_item}>
        <View style={styles.address_op}>
          {/*设置默认*/}
          <TouchableOpacity  style={styles.set_default} activeOpacity={0.5} onPress={_this.setDefault.bind(_this,rowData.id)}>

            {rowData.isDefault?
              <View style={{flexDirection:"row"}}>
                <Image  style={styles.icon_14} source={icon_selecton} />
                <Text style={styles.icon_text}>默认地址</Text>
              </View>
              :
              <View  style={{flexDirection:"row"}}>
                <Image  style={styles.icon_14} source={icon_selectoff} />
                <Text style={styles.icon_text}>设为默认</Text>
              </View>
            }

          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5} onPress={_this.delAddr.bind(_this,rowData.id)}>
           <View style={styles.op_btn}>
             <Image  style={styles.icon_14} source={icon_delete} />
              <Text style={styles.icon_text}>删除</Text>
           </View>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5} onPress={_this.editAddr.bind(_this,rowData.id)}>
           <View style={styles.op_btn}>
             <Image  style={styles.icon_14} source={icon_edit} />
              <Text style={styles.icon_text}>编辑</Text>
           </View>
          </TouchableOpacity>

        </View>
          <View  style={styles.addr_con}>
            <Text style={styles.paragraph}>
              {rowData.name}    {rowData.mobile}
            </Text>
            <View  style={styles.paragraph}>
              <Text>
                {rowData.address}
              </Text>
            </View>
          </View>
    </View>

    );
  }

  //组件生成函数
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
        <TouchableOpacity style={styles.page_header_right} onPress={_this.goAdd.bind(_this)}>
            <Text style={styles.red_text}>
              新增
            </Text>
        </TouchableOpacity>
      );
    })();

    return (
      <View style={styles.container}>

      <PageHeader leftPart={leftPart} rightPart={rightPart} pageTitle="收货地址" clickFn={this.goBack}>
      </PageHeader>


      <View style={{height:Dimensions.get('window').height-60}}>

      <ScrollView
      automaticallyAdjustContentInsets={false}
      >
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._rowRender.bind(this)}
      />
    </ScrollView>

     </View>


     </View>

    );
  }

}
