import React, { Component } from "react";
import { View, Text, Image, Alert, Dimensions } from "react-native";
import { DrawerHeader } from "./DrawerHeader";
import { Card } from "./SideBarCard";
const { width, height } = Dimensions.get("window");

class SideBar extends Component {
  render() {
    const { navigate, replace } = this.props.navigation;
    return (
      <View style={styles.parentView}>
        <DrawerHeader />
        <Card
          onPress={() => replace("ChangePasswordScreen")}
          title= "Reset Password"
        />
        <Card
          onPress={() => navigate("ChangePasswordScreen")}
          title="Terms and Conditions "
        />
        <Card
          onPress={() =>
            Alert.alert(
              "Exit",
              "Are you want to logout",
              [
                { text: "Cancel", style: "cancel" },
                { text: "OK", onPress: () => this._logoutAndClearStore() }
              ],
              { cancelable: false }
            )
          }
          title="Logout"
        />
      </View>
    );
  }
  _logoutAndClearStore() {
    const { navigate } = this.props.navigation;
     navigate("LoginScreen");
  }
}
const styles = {
  parentView: {
    flex: 1,
    backgroundColor: "white"
  },
  DrawerImage: {
    width: "100%",
    height: 160
  },
  text: {
    fontSize: 16,
    marginLeft: 15,
    marginTop: 10
  }
};


export default SideBar;
