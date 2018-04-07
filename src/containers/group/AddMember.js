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
    count:[],
    names:[],
    emailIds:[],
    token:'',
    userId:''
    
  };

  componentDidMount(){
    const { params } = this.props.navigation.state;
    const num = Number(params.memberCount)

    const member = []
    for(var int = 1; int <= num ; int++){
        member.push(int)
    }
    this.setState({ count: member})
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
        );
    }

    _renderFlatList() {
           return(
            <FlatList
            style={{flex:.9}}
            data = {this.state.count}
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
                        onEndEditing={(name) => this._addMemberName(item, name.nativeEvent.text)}
                        style={{ marginTop: 10, fontSize: 15, padding: 5, width: "90%" ,borderBottomWidth:1,borderBottomColor:'gray'}}
                    />
                    <TextInput
                        placeholder={"Member email Id"}
                        keyboardType={"email-address"}
                        autoCapitalize = {'none'}
                        underlineColorAndroid="transparent"
                        onEndEditing={(email) => this._addMemberEmailId(item, email.nativeEvent.text)}
                        style={{marginBottom: 10, fontSize: 15, padding: 5, width: "90%", borderBottomWidth:1,borderBottomColor:'gray' }}
                    />
                </View>
                </View>
            }
            />
        )  
   }
   
    _addMemberName = (index, name) => {
        if (this.state.names.length > 0) {
            var detailsArray = this.state.names
            this.state.names.map((currentDetails, indexes) => {
                if (currentDetails.id === index) {
                    var selected_name = name == null ? currentDetails.name : name
                    var selected = {
                        "id": index,
                        "name": selected_name,
                    }
                    detailsArray[indexes] = selected
                } else {
                    var selected = {
                        "id": index,
                        "name": name,
                    }
                    detailsArray.push(selected)
                }
            })
            this.setState({
                names: detailsArray
            })
        } else {
            var detailsArray = []
            var selected = {
                "id": index,
                "name": name,
            }
            detailsArray.push(selected)
            this.setState({ names: detailsArray })
        }
    }

    _addMemberEmailId = (index, email) => {
        if (this.state.emailIds.length > 0) {
            var detailsArray = this.state.emailIds
            this.state.emailIds.map((currentDetails, indexes) => {
                if (currentDetails.id === index) {
                    var selected_email = email == null ? currentDetails.email : email
                    var selected = {
                        "id": index,
                        "email": selected_email
                    }
                    detailsArray[indexes] = selected
                } else {
                        var selected = {
                            "id": index,
                            "email": email,
                        }
                        detailsArray.push(selected)
                    }
            })
            this.setState({
                emailIds: detailsArray
            })
        } else {
            var detailsArray = []
            var selected = {
                "id": index,
                "email": email
            }
            detailsArray.push(selected)
            this.setState({ emailIds: detailsArray })
        }
    }

    _validateData(){
        if (this.state.names.length > 0){
            var isValidate = true
            var errorMsg = ""
            this.state.names.map((nameDetails, index) => {
                if ( validator.isEmpty(nameDetails.name)) {
                  isValidate = false
                  Alert.alert("Please enter email")
                  return (isValidate)
                } 
            })
        }     
        if (this.state.emailIds.length > 0){
            var isValidate = true
            var errorMsg = ""
            this.state.emailIds.map((emailDetails, index) => {
                 if (validator.isEmpty(emailDetails.email)) {
                  isValidate = false
                  Alert.alert( "Please enter email")
                  return (isValidate)
                } else if (validator.isEmail(emailDetails.email) === false) {
                    isValidate = false
                    Alert.alert("Please enter valid emailId")
                    return (isValidate)
                 }
            })
        }
        if  (this.state.emailIds.length == 0 ||this.state.names.length == 0 ){
            isValidate = false
            Alert.alert("Please enter valid emailId or name")
            return (isValidate)
        }
        return (true)
    }

    _createGroup() {
        const { params } = this.props.navigation.state;
        const { replace } = this.props.navigation;


        if (this._validateData()) {
            var detailsArray = []
            this.state.names.map((nameDetails)=> {
                this.state.emailIds.map((emailDetails)=> {
                    if (nameDetails.id == emailDetails.id) {
                        var selected = {
                            "name": nameDetails.name,
                            "email":  emailDetails.email
                        }
                        detailsArray.push(selected)    
                    }
                }
            )}
            )}
            const body = {
                "name": params.groupName,
                "members": detailsArray,
            }
            this.setState({ isLoading: true })
            postApiCallWithPromise(Url.createGroup, body, this.state.token)
                .then(response => {
                    this.setState({ isLoading: false })
                    replace('GroupListScreen',{token:this.state.token, userId: this.state.userId})                })
                .catch(function (error) {
                    this.setState({ isLoading: false })
                    reject(error);
                });
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