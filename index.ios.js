/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Navigator
} from 'react-native';

class AutoExpandingTextinput extends React.Component {
  constructor(props){
    super(props);
    this.state={
      text:"哈哈",
      height:0
    }
  }

  render(){
    return (
      <TextInput
        {...this.props}
        multiline={true}
          onChange={(event) => {
            this.setState({
              text: event.nativeEvent.text,
              height: event.nativeEvent.contentSize.height,
            });
          }}
        style={[{borderColor:"#05b3e9",fontSize:20,lineHeight:100,borderWidth:1,height:Math.max(35,this.state.height)}]}
        value={this.state.text}
        >

      </TextInput>
    )
  }
}

import  IndexPp from './views/indexPp';
import  TabView from './views/tabView';

class shop extends Component {
  render() {
    return (
      <Navigator
        style={{flex:1}}

        //初始化组件
        initialRoute={{
          title: '首页',
          component: TabView,
        }}

        //
        //navigationBarHidden={true}

        //配置场景
        configureScene={() => {
          return Navigator.SceneConfigs.HorizontalSwipeJump;
        }}

        renderScene={
          (route,navigator)=>{
            let Component=route.component;
            return <Component {...route.params} navigator={navigator} />
          }
        }

        />
    );
  }
}



//设置启动组件 并设置路由
class AwesomeProject extends Component{
  render() {
    return (
      <Navigator
        style={{flex:1}}

        //初始化组件
        initialRoute={{
          title: '首页',
          component: TabView,
        }}

        //
        //navigationBarHidden={true}

        //配置场景
        configureScene={() => {
          return Navigator.SceneConfigs.HorizontalSwipeJump;
        }}

        renderScene={
          (route,navigator)=>{
            let Component=route.component;
            return <Component {...route.params} navigator={navigator} />
          }
        }

        />
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('shop', () => shop);
