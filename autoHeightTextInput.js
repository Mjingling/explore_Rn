import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
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

module.exports=AutoExpandingTextinput;
