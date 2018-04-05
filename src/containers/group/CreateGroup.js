/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * Pranav Manikpure
 */

import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback, Keyboard, TextInput, FlatList, TouchableOpacity } from 'react-native';
import {
    Container,
    Content,
    Form,
    Item,
    Label,
    Button,
    Text,
    Input,
    Toast
} from 'native-base';
import Assets from "../../assets/index";
import GridView from "react-native-super-grid";
import GenericHeader from '../../universal/components/GenericHeader'

export default class CreateGroup extends Component {
  state = {
    groupName:'',
    memberCount:0
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <GenericHeader
          navigation={this.props.navigation}
          headerTitle={"Create Group"}
        />
        <Content scrollEnabled={true} style={{ marginTop: 50 }}>
          <Form style={{ margin: 5 }}>
            <Item floatingLabel>
              <Label>Group Name</Label>
              <Input
              onChangeText={(groupName) => this.setState({groupName})}
              value={this.state.groupName}
            />
            </Item>
            <Item floatingLabel last>
              <Label>Member Count</Label>
              <Input
              onChangeText={(memberCount) => this.setState({memberCount})}
              value={this.state.memberCount}
            />
            </Item>
          </Form>
          <TouchableOpacity
            style={{
              margin: 15,
              backgroundColor: "#2A367D",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              padding: 10
            }}
            onPress={() => {
              navigate("AddMemberScreen",{
                 memberCount: this.state.memberCount,groupName: this.state.groupName });
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}> C R E A T E </Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

const styles = {
    itemContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        padding: 10,
        height: 50,
        borderColor: 'black',
        borderWidth: 1,
        width: '100%',
    }, selectedButtonBackgroundColor: {
        backgroundColor: '#0099cc',
    }
}