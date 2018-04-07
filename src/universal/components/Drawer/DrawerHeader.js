import React, { Component } from "react";
import { Image, ImageBackground, View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export const DrawerHeader = (props) => {
  return (
    <View style={styles.topVIew}>
      <Icon name="user-circle" color="white" size={60} style={styles.image} />
      <Text style={styles.nameText}>{props.Email}</Text>
      <Text style={styles.nameText}>{props.Name}</Text>
    </View>
  );
};

const styles = {
  topVIew: {
    width: "100%",
    height: 180,
    backgroundColor: '#2A367D',
    marginBottom: 10
  },
  nameText: {
    marginLeft: 25,
    marginTop: 5,
    color: "white",
    fontSize: 15,
    fontWeight: "500"
  },
  image: {
    width: 70,
    height: 65,
    marginLeft: 25,
    marginTop: 20,
    borderRadius: 25,
    marginBottom: 20
  }
};
