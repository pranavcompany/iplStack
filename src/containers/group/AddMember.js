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
  H2,
  Button,
  Text,
  Toast
} from 'native-base';
import Assets from "../../assets/index";
import GridView from "react-native-super-grid";
import GenericHeader from '../../universal/components/GenericHeader'

export default class AddMember extends Component {

  state = { 
    itemDataSource :['pranav','pranav','pranav','pranav','pranav','pranav','pranav','pranav','pranav','pranav']
    ,count:[]
  };

  componentDidMount(){
    const { params } = this.props.navigation.state;
    const array = 'Abhishek'
    for(var int = 0; int>= parseInt(params.memberCount); int++){
        this.state.count.push(array)
    }
  }

    render() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        return (
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
            }} >
            <View style={ {flex:1, backgroundColor: 'white'}}>
            <GenericHeader
            navigation={this.props.navigation}
            headerTitle={"Add Members"} />
             <H2 style={{color: 'black', textAlign:'center', margin:5}}>{ params.groupName} </H2>
                {this._renderFlatList(params.memberCount)}
                    <TouchableOpacity style={{
                        flex: .1, margin: 15,backgroundColor: '#2A367D', justifyContent: 'center',
                        alignItems: 'center', borderRadius: 10
                    }} onPress={() => {
                        navigate('GroupListScreen')
                    }}>
                  <Text style={{color: 'white'}}> S U B M I T  </Text>
                </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    _renderFlatList(int) {

        this.state.count.map((data) => {
            return (
                <View style={{
                    marginLeft: 20, marginRight: 20, alignItems: 'center',
                    justifyContent: 'center', borderBottomWidth: 1
                }}>
                    <TextInput
                        placeholder={"Member Name"}
                        underlineColorAndroid="transparent"
                        onChangeText={text => this.setState({ GroupName: text })}
                        style={{ marginTop: 10, fontSize: 15, paddingStart: 10, width: "90%" }}
                    />
                    <TextInput
                        placeholder={"Member email Id"}
                        keyboardType={"email-address"}
                        underlineColorAndroid="transparent"
                        onChangeText={text => this.setState({ MemberCount: text })}
                        style={{ marginTop: 10, marginBottom: 10, fontSize: 15, paddingStart: 10, width: "90%" }}
                    />
                </View>
            )
        })
   }

  _loginButtonPress = () => {
    var isValidate = true
    var errorMsg = ""
    if (this.state.email.length == 0) {
      isValidate = false
      errorMsg = "Please enter email";
    }
    if (this.state.password.length == 0) {
      isValidate = false
      errorMsg = "Please enter password";
    }
    if (this.state.password.length >= 8) {
      isValidate = false
      errorMsg = "Password at least 8 character login";
    }

    Toast.show({
      text: errorMsg,
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