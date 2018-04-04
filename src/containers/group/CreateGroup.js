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
import GenericHeader from '../../universal/components/GenericHeader'

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
            <View style={ {backgroundColor: 'white' }}>
            <GenericHeader
            navigation={this.props.navigation}
            headerTitle={"Create Group"} />
                <View style={{marginTop: 10, alignItems:'center',justifyContent: 'center', borderBottomWidth: 1}}>
                    <View style ={ {flexDirection: 'row', marginTop: 10}}> 
                    <View style = {{width: "50%"}}>
                    <Text style={{ marginStart: 10, fontWeight: 'bold', fontSize: 18 }}>Group Name</Text>
                    </View>
                    <View style = {{width: "50%"}}>
                    <TextInput
                    placeholder={"Enter Group Name"}
                    underlineColorAndroid="transparent"
                    onChangeText={text => this.setState({ GroupName: text })}
                    style={{ fontSize: 15, paddingStart: 10, borderBottomWidth: 1, marginEnd:10}}
                    />
                    </View>
                    </View>
                    <View style ={ {flexDirection: 'row', marginTop:10}}> 
                    <View style = {{width: "50%"}}>
                    <Text style={{ marginStart: 10, fontWeight: 'bold', fontSize: 18 }}>Member Count</Text>
                    </View>
                    <View style = {{width: "50%"}}>
                    <TextInput
                    maxLength={2}
                    placeholder={"Enter Member Count"}
                    keyboardType={"numeric"}
                    underlineColorAndroid="transparent"
                    onChangeText={text => this.setState({ MemberCount: text })}
                    style={{ marginBottom: 10,fontSize: 15, paddingStart: 10, borderBottomWidth: 1, marginEnd:10}}
                    />     
                    </View>   
                    </View>
                </View>
                    <TouchableOpacity style={{ margin: 15, backgroundColor: '#2A367D', justifyContent: 'center',
                        alignItems: 'center', borderRadius: 10, padding:10
                    }} onPress={() => {
                        navigate('AddMemberScreen')
                    }}>
                  <Text style={{color: 'white', fontSize: 18}}> C R E A T E </Text>
                </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
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
    },selectedButtonBackgroundColor: {
        backgroundColor: '#0099cc',
    }
}