'use strict';
var React=require('react-native');
var {
  StyleSheet,
  Text,
  View
}= React;

const styles = StyleSheet.create({
  cellfixed:{
    width:100,
    height: 50,
    backgroundColor: '#ffffff'
  },
cell:{
      flex: 1,
      height: 50,
      backgroundColor: '#aaaaaa'
    },
  zhushi:{
    backgroundColor:"#ededed",
    paddingTop:10,
    paddingBottom:10,
  },
  SearchInput:{
    marginTop:20,
    marginBottom:20
  },
  header:{
    height:40,
    paddingTop:10,
    paddingBottom:10,
  },
  container: {
    marginTop:100,
    backgroundColor: '#ffffff',
    padding:10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions:{
    textAlign: 'center',
  },
  delText: {
    textAlign: 'center',
    color: 'red',
    margin: 5,
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
  pd_5:{
    padding:5
  }
});



var FlexLayout=React.createClass({

  render:function() {
    return (
      <View>

          <Text style={styles.zhushi}>
          尝试居中样式
          </Text>

          <Text style={[styles.text, styles.header]}>
          水平居中
          </Text>

          <View style={{height: 100, backgroundColor: '#333333', alignItems: 'center'}}>
          <View style={{backgroundColor: '#fefefe', width: 30, height: 30, borderRadius: 15}}/>
          </View>

          <Text style={[styles.text, styles.header]}>
          垂直居中
          </Text>
          <View style={{height: 100, backgroundColor: '#333333', justifyContent: 'center'}}>
          <View style={{backgroundColor: '#fefefe', width: 30, height: 30, borderRadius: 15}}/>
          </View>

          <Text style={[styles.text, styles.header]}>
          水平垂直居中
          </Text>
          <View style={{height: 100, backgroundColor: '#333333', alignItems: 'center', justifyContent: 'center'}}>
          <View style={{backgroundColor: '#fefefe', width: 30, height: 30, borderRadius: 15}}/>
          </View>

          <Text style={styles.zhushi}>
          尝试网格布局--等分网格
          </Text>

          <View style={{flexDirection:"row"}}>
            <View style={styles.cell}>
              <Text style={styles.welcome}>
                等分1
              </Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.welcome}>
                等分2
              </Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.welcome}>
                等分3
              </Text>
            </View>
          </View>

          <Text style={styles.zhushi}>
          尝试网格布局--两边固定,中间伸缩
          </Text>

         <View style={{flexDirection:"row"}}>
            <View style={styles.cellfixed}>
              <Text style={styles.welcome}>
                fixed
              </Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.welcome}>
                flex
              </Text>
            </View>
            <View style={styles.cellfixed}>
              <Text style={styles.welcome}>
                fixed
              </Text>
            </View>
          </View>

      </View>
    );
  }

})

module.exports=FlexLayout;
