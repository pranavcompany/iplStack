import React, { Component } from "react";
import { Header, Left, Body, Right, Button, Icon, Title } from "native-base";

export default class Headers extends Component {
  render() {
    return (
      <Header style={{ backgroundColor: '#2A367D' }}>
        <Left>
          <Button transparent onPress={this.props.onOpen}>
            <Icon
              name="bars"
              style={{ color: "white" }}
              type="FontAwesome"
              fontSize={50}
            />
          </Button>
        </Left>
        <Body>
          <Title style={{ color: "white" }}>Group List</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}
