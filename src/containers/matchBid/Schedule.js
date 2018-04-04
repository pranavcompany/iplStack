import React, { Component } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";

export default class Schedule extends Component {
  render() {
    return (
      <View style={ {flex: 1, alignItems:'center', paddingTop: 30}}>
        <Icon name="magic-wand" size={30} color="gray" />
        <Text style={{ alignSelf:'center', color:'gray', fontSize:18, fontWeight:'200'}}>
          Nothing to Show Right Now
        </Text>
      </View>
    );
  }
}
