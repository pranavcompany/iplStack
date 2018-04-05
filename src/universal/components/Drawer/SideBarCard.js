import React, { Component } from "react";

import { Text, TouchableOpacity } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";

export const Card = props => (
  <TouchableOpacity
    onPress={props.onPress}
    style={{
      flexDirection: "row",
      marginBottom: 5
    }}
  >
    <Text style={styles.text}>{props.title}</Text>
  </TouchableOpacity>
);

const styles = {
  text: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 10,
    justifyContent: "center",
    color: "black",
    width: 200,
    fontWeight: "500"
  }
};
