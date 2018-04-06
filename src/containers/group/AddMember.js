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
import {postApiCallWithPromise} from "../../utils/PromiseApiCall"
import {Url} from '../../utils/constant/Url'
import validator from 'validator';
import Spinner from '../../universal/components/Spinner'

export default class AddMember extends Component {

  state = { 
    members:[],
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
                }} onPress={() => {
                    {this._createGroup()}
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
            renderItem={({item, index}) =>
                <View style ={{flexDirection:'row',flex: 1}}>
                <View style={{
                    flex:10,
                   margin:10, alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <TextInput
                        placeholder={"Member Name"}
                        underlineColorAndroid="transparent"
                        onChangeText={name => this._addMemberName(index, name, null)}
                        style={{ marginTop: 10, fontSize: 15, padding: 5, width: "90%" ,borderBottomWidth:1,borderBottomColor:'gray'}}
                    />
                    <TextInput
                        placeholder={"Member email Id"}
                        keyboardType={"email-address"}
                        underlineColorAndroid="transparent"
                        onChangeText={email => this._addMemberName(index, null, email)}
                        style={{marginBottom: 10, fontSize: 15, padding: 5, width: "90%", borderBottomWidth:1,borderBottomColor:'gray' }}
                    />
                </View>
                </View>
           }
            />
        )  
   }
   
    _addMemberName = (index, name, email) => {
        if (this.state.members.length > 0) {
            var detailsArray = this.state.members
            this.state.manageQuote.map((currentDetails, index) => {
                if (currentDetails.id === detailsArray.id) {
                    var selected_email = email == null ? currentDetails.email : email
                    var selected_name = name == null ? currentDetails.name : name
                    var selected = {
                        "id": index,
                        "name": selected_name,
                        "email": selected_email
                    }
                    detailsArray[index] = selected
                } else {
                    var selected_email = email == null ? currentDetails.email : email
                    var selected_name = name == null ? currentDetails.name : name
                    var selected = {
                        "id": index,
                        "name": selected_name,
                        "email": selected_email
                    }
                    detailsArray.push(selected)
                }
            })
            this.setState({
                members: detailsArray
            })
        } else {
            var detailsArray = []
            var selected = {
                "id": index,
                "name": name,
                "email": email
            }
            detailsArray.push(selected)
            this.setState({ members: detailsArray })
        }
    }

 _createGroup(){
    const { params } = this.props.navigation.state;

    // {
    //     "name": "gp name",
    //     "members":	[
    //     {
    //     "name": "abc",
    //     "email": "abc@abc.com"
    //     },
    //     {
    //     "name": "xyz",
    //     "email": "xyz@xyz.com"
    //     }
    //     ]
    //     }
    //     http://34.208.227.151/api/groups

    const body = {
        "name":  params.groupName,

        "members":this.state.password,
        }
        this.setState({ isLoading: true })
      postApiCallWithPromise(Url.createGroup, body)
        .then(response => {
          this.setState({ isLoading: false })
           navigate('GroupListScreen')
        })
        .catch(function(error) {
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