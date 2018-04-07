import React, { Component } from "react";
import { Drawer } from "native-base";
import SideBar from "./SideBar";
import Headers from "./Header";
export default class DrawerBar extends Component {
  closeDrawer = () => {
    this.drawer._root.close();
  };
  openDrawer = () => {
    this.drawer._root.open();
  };

  render() {
    return (
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={
          <SideBar
            Name= {this.props.Name}
            Email= {this.props.Email}
            navigation={this.props.navigation}
          />
        }
        onClose={() => this.closeDrawer()}
      >
        <Headers 
          navigation= {this.props.navigation}
          onOpen={() => this.openDrawer()} />
        {this.props.children}
      </Drawer>
    );
  }
}
