'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ListView,
  TouchableOpacity,
  ScrollView,
  Image,
  View,
  RefreshControl
} from 'react-native';

const styles = StyleSheet.create({
  topic_item:{
    padding:10,
    flexDirection:'row',
    borderBottomWidth:1,
    borderColor:"#ededed"
  },
  user_avater:{
    width:50,
    height:50,
    marginRight:10,
    borderRadius:25
  },
  topic_wapper:{
    flex:1,
    flexDirection:'column'
  },
  topic_title:{
    flex:1,
    fontSize:16
  },
  topic_time:{
    color:"#cccccc",
    marginTop:10,
    marginBottom:10,
    fontSize:12
  }
});


export default class UserList extends Component{
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
  componentDidMount(){
     //var myListView=React.findDOMNode(this.refs.myListView)
     // myListView.onEndReached=function(){
     //  console.log('ended');
     // }
  }
  add0(m){return m<10?'0'+m:m }
  format(shijianchuo)
  {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
  }

  _setData(topics){
    this.setState({
      dataSource:this.state.dataSource.cloneWithRows(topics),
      isRefreshing:false
    });
  }
  fetchData(){
    this.setState({
      isRefreshing:true
    });
    fetch('http://bbs.reactnative.cn/api/category/3')
    .then(response => response.json())
    .then(response => this._setData(response.topics));
  }

  clickFn(index){
    alert(index);
  }

  _rowRender(rowData){
    var user_avater=rowData.user.picture=='' ? "http://bbs.reactnative.cn/uploads/profile/7-profileimg.png":"http://bbs.reactnative.cn/"+rowData.user.picture;
    var timeStr=this.format(rowData.timestamp);
    return (
      <TouchableOpacity onPress={this.clickFn.bind(this,rowData.tid)}>
      <View style={styles.topic_item}>
        <Image  style={styles.user_avater} source={{uri:user_avater}} />

        <View  style={styles.topic_wapper}>
          <Text style={styles.topic_title}>
            {rowData.title}
          </Text>
          <Text style={styles.topic_time}>
            {timeStr}
          </Text>
        </View>

      </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ScrollView

       refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this.fetchData}
            tintColor="#ff0000"
            title="下拉刷新"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }

      >
      <ListView
        ref="myListView"
        dataSource={this.state.dataSource}
        renderRow={this._rowRender}
      />
      </ScrollView>
    );
  }

}
