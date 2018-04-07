/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * Pranav Manikpure
 */

import React, { Component  } from 'react';
import { View, Image, AsyncStorage, TouchableWithoutFeedback, ImageBackground,
    Keyboard, TextInput, FlatList, TouchableOpacity } from 'react-native';
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
        const { params } = this.props.navigation.state
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
                Email={params.email}
                Name={params.name}
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
                        <ImageBackground
                        source={require("../../assets/group2.jpg")}
                        style={{
                            backgroundColor: '#ffffff', shadowOpacity: .5,
                            shadowRadius: 10, margin: 10, padding: 5, height:120,
                             borderRadius:10, justifyContent:'flex-end'
                
                        }}>
                        <TouchableOpacity 
                        onPress={() => {
                            navigate('DashboardScreen', {groupId:item.item.id, memberId:item.item.member_id})
                        }}>
                         <View style={{ 
                             backgroundColor:  'rgba(255,255,255,.5)',marginTop:30,
                              alignItems: 'center', justifyContent: 'center', shadowOpacity:.5, shadowRadius:1}}> 
                            <Text style={{color: '#2A367D', fontWeight: 'bold', fontSize: 24, 
                            marginTop: 10}}>  {item.item.name}  </Text>
                            <Text style={{color: '#34495E', fontWeight: 'bold', fontSize: 15, marginBottom: 10}}>  Members:  {item.item.members}  </Text>
                        </View>
                        </TouchableOpacity>
                        </ImageBackground>
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
