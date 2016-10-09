'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
	AsyncStorage
} from 'react-native';

import Login from './login';
export default class DiyTabBar extends Component {
    static propTypes = {
    goToPage: React.PropTypes.func, // 跳转到对应tab的方法
		activeTab: React.PropTypes.number, // 当前被选中的tab下标
		tabs: React.PropTypes.array, // 所有tabs集合
		tabNames: React.PropTypes.array, // 保存Tab名称
		tabIcons: React.PropTypes.array, // 保存Tab图标
    };  // 注意这里有分号


    render() {
      return (
  			<View style={styles.tabs}>
  				{this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
  			</View>
  		);
    }

    componentDidMount() {
  		// Animated.Value监听范围 [0, tab数量-1]
  		this.props.scrollValue.addListener(this.setAnimationValue);
	  }

    setAnimationValue({value}) {
		  //console.log('动画值：'+value);
	  }

	goPage(name){
    const { navigator } = this.props;
    var componentObj={
        name: '',
        title:'',
        component: null
    };

    if(name=='new'){
      componentObj={
        name: 'NewPage',
        title:'NewPage',
        component: NewPage
      }
    }

    if(name=="userindex"){
      componentObj={
        name: 'userindex',
        title:'userindex',
        component: UserIndex
      }
    }


    if(name=="orderlist"){
      componentObj={
        name: 'orderlist',
        title:'orderlist',
        component: OrderList
      }
    }

    if(name=="login"){
      componentObj={
        name: 'Login',
        title:'Login',
        component: Login
      }
    }

    if(navigator) {
       navigator.push(componentObj);
    }
  }

	jumpPage(pageIndex){
    if(pageIndex!=3){
      this.props.goToPage(pageIndex);
      return;
    }
	let isLogin="no";
	let that=this;
		AsyncStorage.getItem("isLogin",function(err,value){
			if(err){
			console.log("to login");
			}else{
			if(value==null){
				console.log("to login");
				that.goPage('login');
			}else{
				isLogin=value;
				console.log("login state");
				console.log(isLogin);
				console.log("login end");
				that.props.goToPage(pageIndex);
			}
			}
		});

	}


    renderTabOption(tab, i) {
		let color = this.props.activeTab == i ? "#ff3d3e" : "#a9b7b7"; // 判断i是否是当前选中的tab，设置不同的颜色
    let attr = this.props.activeTab == i ? "on" : "off"; // 判断i是否是当前选中的tab，设置不同的颜色
		return (
			<TouchableOpacity onPress={()=>this.jumpPage(i)} style={styles.tab} key={tab}>
				<View style={styles.tabItem}>
					<Image
            style={{width:20,height:20,resizeMode:Image.resizeMode.stretch,paddingVertical:5}}
            source={this.props.tabIcons[i][attr]}
						/>
					<Text style={{color: color,paddingVertical:5}}>
						{this.props.tabNames[i]}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}


}

const styles = StyleSheet.create({
    tabs: {
		flexDirection: 'row',
		height: 50,
		borderTopColor:"#ededed",
		borderTopWidth:1
	},

	tab: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},

	tabItem: {
		flexDirection: 'column',
		alignItems: 'center',
	},

});
