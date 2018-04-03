/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * Pranav Manikpure
 */

import React, { Component  } from 'react';
import { View, Image, TouchableWithoutFeedback, Keyboard, TextInput, FlatList, TouchableOpacity } from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Button,
  Text,
  Toast
} from 'native-base';
import Assets from "../../assets/index";
import GridView from "react-native-super-grid";

export default class CreateGroup extends Component {

  state = { 
    itemDataSource :['pranav','pranav','pranav','pranav','pranav','pranav','pranav','pranav','pranav','pranav']
  };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
            }} >
            <View style={ {flex:1, backgroundColor: 'white'}}>
                <View style={{flex:1, marginTop: 30, alignItems:'center',justifyContent: 'center', borderBottomWidth: 2 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Create Group</Text>
                    <View style ={ {flexDirection: 'row', marginTop: 20}}> 
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Create Name</Text>
                    <TextInput
                    placeholder={"Enter Group Name"}
                    underlineColorAndroid="transparent"
                    onChangeText={text => this.setState({ GroupName: text })}
                    style={{ fontSize: 15, paddingStart: 10, width: "50%"}}
                    />
                    </View>
                    <View style ={ {flexDirection: 'row'}}> 
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Member Count</Text>
                    <TextInput
                    maxLength={2}
                    placeholder={"Enter Group Member Count"}
                    keyboardType={"numeric"}
                    underlineColorAndroid="transparent"
                    onChangeText={text => this.setState({ MemberCount: text })}
                    style={{ marginBottom: 10,fontSize: 15, paddingStart: 10, width: "50%"}}
                    />        
                    </View>
                </View>
                {this._renderFlatList()}
                    <TouchableOpacity style={{
                        flex: .5, margin: 15, backgroundColor: '#6666ff', justifyContent: 'center',
                        alignItems: 'center', borderRadius: 10
                    }} onPress={() => {
                        navigate('GroupListScreen')
                    }}>
                  <Text> Create  </Text>
                </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    _renderFlatList() {
        return (
          <View style= {{flex:6, marginTop: 10}}>
            <FlatList
              data={this.state.itemDataSource}
                renderItem={item => (<View style={{margin: 5, alignItems:'center',
                justifyContent: 'center', borderWidth: 1, borderRadius: 10}}>
                <TextInput
                placeholder={"Member Name"}
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ GroupName: text })}
                style={{ marginTop: 10,fontSize: 15, paddingStart: 10, width: "90%"}}
                />
                <TextInput
                placeholder={"Member email Id"}
                keyboardType={"email-address"}
                underlineColorAndroid="transparent"
                onChangeText={text => this.setState({ MemberCount: text })}
                style={{ marginTop: 10, marginBottom: 10,fontSize: 15, paddingStart: 10, width: "90%"}}
                />        
            </View>
        )}
            />
          </View>
        );
      }

  _loginButtonPress = () => {
    var isValidate = true
    var errormsg = ""
    if (this.state.email.length == 0) {
      isValidate = false
      errormsg = "Please enter email";
    }
    if (this.state.password.length == 0) {
      isValidate = false
      errormsg = "Please enter password";
    }
    if (this.state.password.length >= 8) {
      isValidate = false
      errormsg = "Password atleast 8 character login";
    }

    Toast.show({
      text: errormsg,
      position: 'top',
      buttonText: 'Okay'
    })
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
    },selectedButtonBackgroundColor: {
        backgroundColor: '#0099cc',
    }
}