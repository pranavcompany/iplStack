/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * Pranav Manikpure
 */

import React, { Component  } from 'react';
import { View, Image, TouchableWithoutFeedback, Keyboard, AsyncStorage,Alert, TextInput, FlatList, TouchableOpacity } from 'react-native';
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
import {postApiCallWithPromise} from "../../utils/PromiseApiCall"
import {Url} from '../../utils/constant/Url'
import validator from 'validator';
import Spinner from '../../universal/components/Spinner'

export default class AddMember extends Component {

  state = { 
    members:[],
    token:'',
    userId:''
    
  };

  componentDidMount(){
    const { params } = this.props.navigation.state;
    const num = Number(params.memberCount)

    const member = []
    for(var int = 0; int < num ; int++){
        var selected = {
            "id": 0,
            "name": "",
            "email": ""
        }
        selected.id = int
        member.push(selected)
    }
    console.log(member)
    this.setState({ members: member})
    AsyncStorage.getItem("token").then((value2) => {
        this.setState({token:value2});
      }).done();
      AsyncStorage.getItem("userId").then((value2) => {
        this.setState({userId:value2});
      }).done();
  }

    render() {
        const { navigate } = this.props.navigation;
        const { params } = this.props.navigation.state;
        return (
            <ViewSpinner
            style={{ flex: 1,
              backgroundColor: 'white',
              justifyContent: 'center'}}
            isLoading={this.state.isLoading}
          >
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
            }} >
            <View style={ { backgroundColor: 'white', flex:1}}>
            <GenericHeader
            navigation={this.props.navigation}
            headerTitle={"Add Members"} />           
             <H2 style={{color: 'black', flex:.1, textAlign:'center', marginStart:10, marginTop: 10}}>
             { params.groupName} </H2>
                {this._renderFlatList()}
                <TouchableOpacity style={{
                    flex: .1, margin: 10,backgroundColor: '#2A367D', justifyContent: 'center',
                    alignItems: 'center', borderRadius: 10
                }} onPress={() => { this._createGroup()
                }}>
              <Text style={{color: 'white'}}> S U B M I T  </Text>
            </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
            </ViewSpinner>
        );
    }

    _renderFlatList() {
           return(
            <FlatList
            style={{flex:.9}}
            data = {this.state.members}
            renderItem={({item}) =>
                <View style ={{flexDirection:'row',flex: 1}}>
                <View style={{
                    flex:10,
                   margin:10, alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <TextInput
                        placeholder={"Member Name"}
                        underlineColorAndroid="transparent"
                        onEndEditing={(name) => this._addMemberName(item.id, name.nativeEvent.text)}
                        style={{ marginTop: 10, fontSize: 15, padding: 5, width: "90%" ,borderBottomWidth:1,borderBottomColor:'gray'}}
                    />
                    <TextInput
                        placeholder={"Member email Id"}
                        keyboardType={"email-address"}
                        autoCapitalize = {'none'}
                        underlineColorAndroid="transparent"
                        onEndEditing={(email) => this._addMemberEmailId(item.id, email.nativeEvent.text)}
                        style={{marginBottom: 10, fontSize: 15, padding: 5, width: "90%", borderBottomWidth:1,borderBottomColor:'gray' }}
                    />
                </View>
                </View>
            }
            />
        )  
   }
   
    _addMemberName = (index, name) => {
        var details = this.state.members
        this.state.members.map((currentDetails, indexes) => {
            if (currentDetails.id === index) {
                details[index].name = name
            }
        })
        this.setState({ members: details })
    }

    _addMemberEmailId = (index, email) => {
        var details = this.state.members
        this.state.members.map((currentDetails, indexes) => {
            if (currentDetails.id === index) {
                details[index].email = email
            }
        })
        this.setState({ members: details })
    }

    _createGroup() {
        const { params } = this.props.navigation.state;
        const { replace } = this.props.navigation;
        var isValidate = true
        if (this.state.members.length > 0){
            this.state.members.map((details) => {
                if (validator.isEmpty(details.name)) {
                  isValidate = false
                  Alert.alert("Please enter name")
                  return isValidate
                } else if (validator.isEmpty(details.email)) {
                    isValidate = false
                    Alert.alert( "Please enter email")
                    return isValidate
                  } else if (validator.isEmail(details.email) === false) {
                      isValidate = false
                      Alert.alert("Please enter valid emailId")
                      return isValidate
                   }
            })
        }     
        if (isValidate) {
        this.setState({ isLoading: true })
            var detailsArray = []
            this.state.members.map((details) => {
                var selected = {
                    "name": details.name,
                    "email": details.email
                }
                detailsArray.push(selected)
            })
            const body = {
                "name": params.groupName,
                "members": detailsArray,
            }
            postApiCallWithPromise(Url.createGroup, body, this.state.token)
                .then(response => {
                    this.setState({ isLoading: false })
                    if (response.status == 200) {
                        Alert.alert(
                            "Success",
                            "Group Created Successfully !",
                            [
                                {
                                    text: "OK", onPress: () => replace('GroupListScreen', { token: this.state.token, userId: this.state.userId })
                                }
                            ],
                            { cancelable: false }
                        )
                    } else {
                        alert(response.data);
                    }
                })
                .catch(function (error) {
                    this.setState({ isLoading: false })
                    reject(error);
                });
        }
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