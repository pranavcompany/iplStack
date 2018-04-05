/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * Pranav Manikpure
 */

import React, { Component  } from 'react';
import { View, Image, AsyncStorage, TouchableWithoutFeedback, Keyboard, TextInput, FlatList, TouchableOpacity } from 'react-native';
import {
  Text,
} from 'native-base';
import Assets from "../../assets/index";
import GridView from "react-native-super-grid";
import GenericHeader from '../../universal/components/GenericHeader'
import {getApiCallWithPromise} from "../../utils/PromiseApiCall"
import {Url} from '../../utils/constant/Url'
import Spinner from '../../universal/components/Spinner'
import Drawer from '../../universal/components/Drawer/Drawer'

let ViewSpinner = Spinner(View);

export default class GroupList extends Component {
    state = {
        itemDataSource: []
    };


    componentDidMount(){
        const {params}= this.props.navigation.state
        {this._getAllGroup(params.token)}
        this.saveKey(params.token,params.userId)
    }

    async saveKey(token,userId ) {
        try {
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('userId', userId.toString());
        } catch (error) {
          console.log("Error saving data" + error);
        }
    }


   
    render() {
        return (
            <ViewSpinner
            style={{ flex: 1,
              backgroundColor: 'white',
              justifyContent: 'center'}}
            isLoading={this.state.isLoading}
          >
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss()
            }} >
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Drawer 
                navigation={this.props.navigation}>
                    {this.state.itemDataSource.length > 0 ? this._renderFlatList() : this._emptyView()}
                </Drawer>
                </View>
            </TouchableWithoutFeedback>
            </ViewSpinner>
        );
    }

    _renderFlatList() {
        console.log("#$#$#"+ AsyncStorage.getItem('userId'))
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 6 , marginTop:20}}>
                <FlatList
                    data={this.state.itemDataSource}
                    renderItem={item => (
                        <TouchableOpacity onPress={() => {
                            navigate('DashboardScreen', {groupId:item.item.id, memberId:item.item.member_id})
                        }}>
                        <View style={{ marginStart: 30, marginEnd: 30, backgroundColor: '#919cda', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: "#2A367D", borderRadius: 10 , marginTop: 20, shadowOpacity:.5, shadowRadius:1}}>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 24, marginTop: 10}}>  {item.item.name}  </Text>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14, marginBottom: 10}}>  Members:  {item.item.members}  </Text>
                        </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }
    _emptyView(){
        return(
        <View style={{margin: 20,
            alignItems: 'center'}}>
        <Text>Click Add Button to add group </Text>
      </View>
        )
    }

    _getAllGroup(token){
        getApiCallWithPromise(Url.userGroupsUrl, token)
    .then(response => {
      this.setState({ isLoading: false, 
                    itemDataSource: response.data })
      console.log(response.data)
    })
    .catch(function(error) {
      this.setState({ isLoading: false })
      console.log(error)
      reject(error);
    });
    }
}
