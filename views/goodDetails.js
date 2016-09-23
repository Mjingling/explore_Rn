'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  WebView,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop:22,
    backgroundColor: '#ffffff',
    padding:0
  }
});

var Dimensions=require('Dimensions');
var w_width=Dimensions.get('window').width;
var w_height=Dimensions.get('window').height;
const stylesPublic=require('./styles');
import Loading from './loading';
const WEBVIEW_REF="webview";
var icon_back=require('./images/icon-back.png');

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


export default class GoodDetails extends Component{
    constructor(props){
        super(props);
        this.state={
            isloading:true,
            isloadErr:false,
            url:'http://m.naduoduo.jinjushu.com/baina_detail/'+this.props.goodId
        }
    }
  
  goBack(){
    //console.log(name);
    const { navigator } = this.props;
    if(navigator) {
       navigator.pop();
    }
  }

    componentDidMount(){

    }

    loadSuc(){
        this.setState({
            isloading:false,
            isloadErr:false
        });
                console.log('load loadSuc');
    }

    loadStart(){
        console.log('load start');
    }


    loadEnd(){
        console.log('load loadEnd');
        this.setState({
            isloading:false
        });
    }



    loadErr(){
        this.setState({
            isloadErr:true
        });
        console.log('load loadErr');
    }

    reload() {
    this.refs[WEBVIEW_REF].reload();
  }

  renderError(obj){
      console.log("加载失败");

      return (
          <TouchableOpacity  onPress={this.reload.bind(this)}>
            <Text style={{paddingVertical:10,textAlign:'center'}}>加载失败</Text>
            <Text style={{paddingVertical:10,textAlign:'center'}}>点击重新加载</Text>
          </TouchableOpacity>
      );
  }

  renderLoading(){
      //重新加载 reload 的时候 返回这个视图是有用的
      return (
      <Loading />
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
    
    return (
      <View style={styles.container}>
      <PageHeader leftPart={leftPart} pageTitle="商品详情" clickFn={this.goBack}>
      </PageHeader>
      
      <View style={{height:Dimensions.get('window').height-60}}>
      <ScrollView
      automaticallyAdjustContentInsets={false}
      >
          <WebView
            ref={WEBVIEW_REF}
            source={{uri:this.state.url}}
            style={{height:w_height-60}}
            automaticallyAdjustContentInsets={true}
            onLoadStart={this.loadStart.bind(this)}
            onLoadEnd={this.loadEnd.bind(this)}
            onError={this.loadErr.bind(this)}
            onLoad={this.loadSuc.bind(this)}
            renderError={this.renderError.bind(this)}
            renderLoading={this.renderLoading.bind(this)}
            startInLoadingState={true}
            onNavigationStateChange={(info)=>{
              console.log(info);
     this.setState({
 WebViewHeight:info.url.split('#')[1]
     })
  }}
            >
          </WebView>
        </ScrollView>
      </View>
      </View>
    );
  }

}

