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
    count:[]
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
            scrollEnabled={true}
          >
             <H2 style={{color: 'black', textAlign:'center', marginStart:10, marginTop: 10}}>{ params.groupName} </H2>
                {this._renderFlatList()}
                </KeyboardAwareScrollView>
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
                        onChangeText={text => this.setState({ GroupName: text })}
                        style={{ marginTop: 10, fontSize: 15, padding: 5, width: "90%" ,borderBottomWidth:1,borderBottomColor:'gray'}}
                    />
                    <TextInput
                        placeholder={"Member email Id"}
                        keyboardType={"email-address"}
                        underlineColorAndroid="transparent"
                        onChangeText={text => this.setState({ MemberCount: text })}
                        style={{marginBottom: 10, fontSize: 15, padding: 5, width: "90%", borderBottomWidth:1,borderBottomColor:'gray' }}
                    />
                </View>
                </View>
           }
            />
        )
            
   }
 _createGroup(){
    const body = {
        "group": this.state.username,
        "password":this.state.password,
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