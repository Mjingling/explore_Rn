'use strict';
var React=require('react-native');
var {
  StyleSheet,
  Text,
  View,
  Image
} = React;

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
    marginTop:44,
    backgroundColor: '#ffffff',
    padding:10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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



var imageLayout=React.createClass({
  render:function() {
    return (
      <View style={styles.container}>
      <Text style={styles.zhushi}>
          图片布局
          </Text>
        <Text style={styles.welcome}> 100px height with resizeMode contain </Text>
          <View style={[{flex: 1, backgroundColor: '#fe0000'}]}>
              <Image style={{flex: 1, height: 100, resizeMode: Image.resizeMode.contain}} source={{uri: 'http://gtms03.alicdn.com/tps/i3/TB1Kcs5GXXXXXbMXVXXutsrNFXX-608-370.png'}} />
          </View>


          <Text style={styles.welcome}> 100px height with resizeMode cover </Text>
          <View style={[{flex: 1, backgroundColor: '#fe0000'}]}>
              <Image style={{flex: 1, height: 100, resizeMode: Image.resizeMode.cover}} source={{uri: 'http://gtms03.alicdn.com/tps/i3/TB1Kcs5GXXXXXbMXVXXutsrNFXX-608-370.png'}} />
          </View>

          <Text style={styles.welcome}> 100px height with resizeMode stretch </Text>
          <View style={[{flex: 1, backgroundColor: '#fe0000'}]}>
              <Image style={{flex: 1, height: 100, resizeMode: Image.resizeMode.stretch}} source={{uri: 'http://gtms03.alicdn.com/tps/i3/TB1Kcs5GXXXXXbMXVXXutsrNFXX-608-370.png'}} />
          </View>

          <Image style={{flex: 1}} source={{uri: 'http://gtms03.alicdn.com/tps/i3/TB1Kcs5GXXXXXbMXVXXutsrNFXX-608-370.png'}} />
      </View>
    );
  }

})

module.exports=imageLayout;
