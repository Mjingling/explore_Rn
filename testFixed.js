'use strict';
var React=require('react-native');
var {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  ListView,
  View
} = React;

//首页的样子
var TestFixed=React.createClass({
  getInitialState:function(){
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      searchString: 'london',
      dataSource: ds.cloneWithRows([1,2,3,4,5,6,7,7,8,9,11,0,11])
    };
  },
  delFn:function(){
    //alert("11");
    AlertIOS.alert(
      '确认',
      '是否删除?',
      [
        {text: '是', onPress: () => console.log('是 Pressed!')},
        {text: '否', onPress: () => console.log('否 Pressed!')},
      ]
    )
  },
 _pressButton:function(routeUrl) {
        const { navigator } = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props

        var componentObj={}

        switch(routeUrl){
          case "topics" :
            componentObj={
                name: 'UserList',
                title:'文章列表',
                component: UserList,
            };
          break;
          case "image" :
            componentObj={
                name: 'ImageLayout',
                title:'图片布局',
                component:  ImageLayout,
            };
          break;
          case "flex" :
            componentObj={
                name: 'FlexLayout',
                title:'flex布局',
                component: FlexLayout,
            };
          break;
          case "search" :
            componentObj={
                name: 'SearchInput',
                title:'搜索宝贝',
                component: SearchInput,
            };
          break;
        }


        if(navigator) {
            navigator.push(componentObj);
        }
    },
    _renderRows:function(RowData){
        return (
        <View style={styles.footer}>
         <Text style={{height:40}}>{RowData}</Text>
        </View>
        )
    },
  render:function() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
         <Text style={{height:40}}>header</Text>
        </View>
        <View style={{flex:1,padding:0,margin:0}}>
          <ScrollView contentContainerStyle={{flexDirection:'column'}}>

        <ListView
          contentContainerStyle={styles.list_wrapper}
          dataSource={this.state.dataSource}
          renderRow={this._renderRows}
          initialListSize={15}
        />

          </ScrollView>
        </View>

        <View style={styles.footer}>
         <Text style={{height:40}}>footer</Text>
        </View>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container:{
    flexDirection:'column',
    backgroundColor: '#ffffff',
    flex:1,
    marginTop:80
  },
  footer:{
      height: 50,
      borderColor:'#ededed',
      borderWidth:1
    },
  header:{
      height: 50,
      borderColor:'#ededed',
      borderWidth:1
  }
});

module.exports=TestFixed;
