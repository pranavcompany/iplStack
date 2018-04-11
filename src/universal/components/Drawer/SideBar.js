import React, { Component } from "react";
import { View, Text, Image, Alert, Dimensions, AsyncStorage } from "react-native";
import { DrawerHeader } from "./DrawerHeader";
import { Card } from "./SideBarCard";
const { width, height } = Dimensions.get("window");

class SideBar extends Component {
  render() {
    const { navigate, replace } = this.props.navigation;
    return (
      <View style={styles.parentView}>
        <DrawerHeader 
         Name= {this.props.Name}
         Email= {this.props.Email}/>
        <Card
          onPress={() => navigate("ChangePasswordScreen")}
          title= "Change Password"
        />
        <Card
          onPress={() => navigate("RuleScreen")}
          title="Rule Book"
        />
        <Card
          onPress={() =>
            Alert.alert(
              "Exit",
              "Do you want to logout",
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
    const { replace } = this.props.navigation;
    AsyncStorage.clear();
     replace("LoginScreen");
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
