/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * Pranav Manikpure
 */

import React, { Component  } from 'react';
import { View, Image, TouchableWithoutFeedback, Keyboard, TextInput, FlatList, TouchableOpacity } from 'react-native';
import {
  Text,
} from 'native-base';
import Assets from "../../assets/index";
import GridView from "react-native-super-grid";
import GenericHeader from '../../universal/components/GenericHeader'
import {getApiCallWithPromise} from "../../utils/PromiseApiCall"
import {Url} from '../../utils/constant/Url'
import Spinner from '../../universal/components/Spinner'

let ViewSpinner = Spinner(View);

export default class GroupList extends Component {

    componentDidMount(){
        const {params}= this.props.navigation.state
        {this._getAllGroup(params.token)}
    }

    state = {
        itemDataSource: []
    };
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
                <GenericHeader
                    isShow={true}
                    navigation={this.props.navigation}
                    navigateTo = 'CreateGroupScreen'
                    headerTitle={"Group List"} />
                    {this.state.itemDataSource.length > 0 ? this._renderFlatList() : this._emptyView()}
                </View>
            </TouchableWithoutFeedback>
            </ViewSpinner>
        );
    }

    _renderFlatList() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 6 , marginTop:20}}>
                <FlatList
                    data={this.state.itemDataSource}
                    renderItem={item => (
                        <TouchableOpacity onPress={() => {
                            navigate('DashboardScreen')
                        }}>
                        <View style={{ marginStart: 30, marginEnd: 30, backgroundColor: '#919cda', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: "#2A367D", borderRadius: 10 , marginTop: 20, shadowOpacity:.5, shadowRadius:1}}>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 24, marginTop: 10}}>  {item.item.name}  </Text>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14, marginBottom: 10}}>  Members:  {item.item.members.length}  </Text>
                            />
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
