'use strict';
import React, { Component } from 'react';
import {
  Text,
} from 'react-native';

import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';

import AddressList from './addressList';
import UserIndex from './userIndex';
import IndexPp from './indexPp';
import UserList from './userList';
import Message from './message';
import DiyTabBar from './diyTabBar';

import * as launchImage from 'react-native-launch-image';

const tabIcons=[
    {on:require('../assets/nav-home-on.png'),off:require('../assets/nav-home-off.png')},
    {on:require('../assets/nav-circle-on.png'),off:require('../assets/nav-circle-off.png')},
    {on:require('../assets/nav-message-on.png'),off:require('../assets/nav-message-off.png')},
    {on:require('../assets/nav-mine-on.png'),off:require('../assets/nav-mine-off.png')}
];

export default class TabView extends Component{
  constructor(props){
      super(props);
      this.state = {
        tabNames: ['优选', '优选圈', '消息', '我的'],
        tabIcons: tabIcons,

      };
    }

      componentWillReceiveProps(nextProps) {
    console.log('will---');
        const { navigator } = nextProps;
    let routes=navigator.getCurrentRoutes();
    console.log(routes);
}

async componentDidMount(){
        // 随便做点什么，包括可以用await去做异步调用。
        launchImage.hide();
}

      render() {
      return (
        <ScrollableTabView
        renderTabBar={() => <DiyTabBar {...this.props} tabNames={this.state.tabNames} tabIcons={this.state.tabIcons}/>}
        tabBarPosition="bottom"
      >
        <IndexPp {...this.props} tabLabel='优选' />
        <UserList {...this.props} tabLabel='优选圈' />
        <Message {...this.props} tabLabel='消息' />
        <UserIndex {...this.props} tabLabel='我的' />
      </ScrollableTabView>
      )
    }
}
