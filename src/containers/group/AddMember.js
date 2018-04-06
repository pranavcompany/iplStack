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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default class AddMember extends Component {

  state = { 
    itemDataSource :['pranav','pranav','pranav','pranav','pranav','pranav','pranav','pranav','pranav','pranav']
    ,count:[]
  };

  componentDidMount(){
    const { params } = this.props.navigation.state;
    const num = Number(params.memberCount)

    const array = 'Abhishek'
    const member = []
    for(var int = 1; int <= num ; int++){
        member.push(array)
    }
    this.setState({ count: member})
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
            <KeyboardAwareScrollView

            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.keyboardAvoidingViewStyle}
            scrollEnabled={true}
          >
             <H2 style={{color: 'black', textAlign:'center', marginStart:10}}>{ params.groupName} </H2>
                {this._renderFlatList()}
                    <TouchableOpacity style={{
                        flex: .1, margin: 10,backgroundColor: '#2A367D', justifyContent: 'center',
                        alignItems: 'center', borderRadius: 10
                    }} onPress={() => {
                        navigate('GroupListScreen')
                    }}>
                  <Text style={{color: 'white'}}> S U B M I T  </Text>
                </TouchableOpacity>
                </KeyboardAwareScrollView>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    _renderFlatList() {
           return(

            <FlatList
            style={{flex:.9}}
            data = {this.state.count}
            renderItem={({item, index}) =>
                <View style ={{flexDirection:'row',flex: 1}}>
                <H2 style={{flex:.8, marginLeft:10,marginTop:10}}>{index+1}</H2>
                <View style={{
                    flex:10,
                   margin:10, alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <TextInput
                        placeholder={"Member Name"}
                        underlineColorAndroid="transparent"
                        onChangeText={text => this.setState({ GroupName: text })}
                        style={{ marginTop: 10, fontSize: 15, padding: 10, width: "90%" ,borderBottomWidth:1,borderBottomColor:'gray'}}
                    />
                    <TextInput
                        placeholder={"Member email Id"}
                        keyboardType={"email-address"}
                        underlineColorAndroid="transparent"
                        onChangeText={text => this.setState({ MemberCount: text })}
                        style={{ marginTop: 10, marginBottom: 10, fontSize: 15, padding: 10, width: "90%", borderBottomWidth:1,borderBottomColor:'gray' }}
                    />
                </View>
                </View>
           }
            />
        )
            
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