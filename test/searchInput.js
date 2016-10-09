'use strict';
var React=require('react-native');
var {
  StyleSheet,
  Text,
  TextInput,
  ListView,
  ScrollView,
  TouchableOpacity,
  Image,
  View
} = React;



var SearchInput=React.createClass({
  _getRandomNum:function(Min,Max)
    {
    var Range = Max - Min;
    var Rand = Math.random();
    return(Min + Math.round(Rand * Range));
    }
  ,
  _getData:function(){
    var dataSet=[];
    var defaultStrArr=["欢乐颂","琅琊榜","美国队长3","钢铁侠","心理罪","冰河追凶","我的青春不迷茫"];
    for (var i = 0; i < 55; i++) {
      dataSet.push({
        text:defaultStrArr[this._getRandomNum(0,6)],
        index:i
      });
    }
    return dataSet;
  }
  ,
  getInitialState:function(){
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      searchString:"",
      hotSearch:"充电宝 欢乐颂 iphone",
      dataSource: ds.cloneWithRows(this._getData())
    }
  }
  ,
  fetchData:function(){
    fetch('http://bbs.reactnative.cn/api/category/3',{
      method:'GET',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      mode:'cors'
    }).then(function(response){
      //console.log(response);
      //console.log(response.json());
    });
  }
  ,
  _onPressButton:function(){
    var keyWords=this.state.searchString;
    if(keyWords==""){
      alert("请输入关键字~");
    }else{
      this.fetchData();
    }
  }
  ,
  _renderRows:function(rowData){
    return (
      <View style={styles.list_item}>
         <Text style={{flex:1,textAlign:'center'}}>
           {rowData.text}
         </Text>
      </View>
    )
  }
  ,
  render:function(){
    return (

    <View style={styles.container}>
      <ScrollView>
        <View style={styles.SearchInput}>
          <View style={{flexDirection:"row"}}>
          <TextInput
            style={styles.input}
            value={this.state.searchString}
            placeholder="请输入您要搜索的宝贝.."
            onChangeText={(searchString) => this.setState({searchString:searchString})}
            keyboardType="default"
            />
            <TouchableOpacity onPress={this._onPressButton}>
              <Text
                style={styles.button}
              >
              搜索
              </Text>
            </TouchableOpacity>
          </View>

            <View  style={styles.hotSearch}>
              <Text style={{color:"#cccccc"}}>
                热门搜索:{this.state.hotSearch}
              </Text>
            </View>
        </View>

        <ListView
          contentContainerStyle={styles.list_wrapper}
          dataSource={this.state.dataSource}
          renderRow={this._renderRows}
          initialListSize='15'
        />

          </ScrollView>
      </View>

    );
  }

});


const styles = StyleSheet.create({
  list_wrapper:{
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  list_item:{
    width:100,
    padding:0,
    borderColor:"#ededed",
    borderWidth:1,
    height:100,
    margin:3,
    justifyContent: 'center',
    backgroundColor:"#ededed",
    flexDirection:'column',
    alignItems:'center'
  },
  SearchInput:{
  },
  container: {
    backgroundColor: '#ffffff',
    padding:10,
    paddingBottom:0,
    flexDirection:'column',
    flex:1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    textAlign: 'center',
    color: '#ffffff',
    width:80,
    height:40,
    backgroundColor:"#ff3d3e",
    borderRadius:5,
    marginLeft:10,
    padding:10,
  },
  input:{
    padding:5,
    backgroundColor:"#f4f4f4",
    borderColor:"#ededed",
    borderWidth:1,
    height:40,
    flex:1,
    borderRadius:5
  },
  hotSearch:{
    paddingTop:5,
    paddingBottom:5
  }
});

//抛出组件的调用
module.exports=SearchInput;
