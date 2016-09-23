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
import Dimensions from 'Dimensions';
import Response from './topics.json';
import TopicDetails from './topicDetails'

const styles = StyleSheet.create({
  topic_item:{
    padding:10,
    flexDirection:'row',
    borderBottomWidth:1,
    borderColor:"#ededed",
    backgroundColor:"#ffffff"
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
const stylesPublic=require('./styles');
const user_avater=require('./images/7-profileimg.png');
import Loading from './loading';
class PageHeader extends Component{
  render(){
    var leftPart=this.props.leftPart;
    var rightPart=this.props.rightPart;

    return (
      <View style={stylesPublic.page_header}>
          {leftPart}
          <View style={stylesPublic.page_title_wrapper}>
             <Text style={stylesPublic.page_title}>{this.props.pageTitle}</Text>
          </View>
          {rightPart}
      </View>
    )
  }
}

export default class UserList extends Component{
  constructor(props){
    super(props);
    this.state={
      isloading:false,
      dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  componentWillMount(){

  }
  componentDidMount(){
    this.fetchData();
  }

  add0(m)
  {
    return m<10? '0'+m:m;
  }

  format (shijianchuo){
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
      isloading:false
    });
  }
  fetchData(){
    let __this=this;
    this.setState({
      isloading:true
    });
    let obj={};
    fetch('http://bbs.reactnative.cn/api/category/3')
    .then(response => response.json())
    .then(function(response){
      __this._setData(response.topics)
    })
    .catch(function(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
    });
  }

    componentWillReceiveProps(nextProps) {
    this.fetchData();
}

  showDetails(tid,title){
    const { navigator } = this.props;
    var componentObj={
        name: 'TopicDetails',
        title:'TopicDetails',
        component: TopicDetails,
        params: {
          topicId:tid,
          title:title
        }
        
    };
    if(navigator) {
       navigator.push(componentObj);
    }
  }

  _rowRender(rowData){
    let user_avater=rowData.user.picture=='' ? "http://bbs.reactnative.cn/uploads/profile/7-profileimg.png":"http://bbs.reactnative.cn/"+rowData.user.picture;
    let timeStr=this.format(rowData.timestamp);
    return (
      <TouchableOpacity  onPress={this.showDetails.bind(this,rowData.tid,rowData.title)}>
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
      <View style={stylesPublic.container}>
      <PageHeader pageTitle="优选圈" clickFn={this.goBack}>
      </PageHeader>
      {this.state.isloading?  <Loading />:null}
      <View style={{height:Dimensions.get('window').height-110}}>
      <ScrollView
      >
      <ListView
        ref="myListView"
        dataSource={this.state.dataSource}
        renderRow={this._rowRender.bind(this)}
      />
      </ScrollView>
    </View>
    </View>
    );
  }

}
