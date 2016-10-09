import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Navigator
} from 'react-native';

import  IndexPp from './components/indexPp';
import  TabView from './components/tabView';


//设置启动组件 并设置路由
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
AppRegistry.registerComponent('shop', () => shop);
