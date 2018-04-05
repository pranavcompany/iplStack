import React, { Component } from "react";
import {TouchableOpacity } from 'react-native'
import { Header, Left, Body, Right, Button, Icon, Title } from "native-base";

export default class Headers extends Component {
  render() {
    const {navigate} = this.props.navigation
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
        <Right>
          <TouchableOpacity onPress={() => navigate("CreateGroupScreen")} >
              <Icon
                   name='add'
                   style={{ color: 'white', marginRight: 10 }}
                   fontSize={50}
                    />
                </TouchableOpacity> 
    </Right>
      </Header>
    );
  }
}
