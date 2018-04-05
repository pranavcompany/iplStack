/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * Pranav Manikpure
 */

import React, { Component  } from 'react';
import { View, Image, TouchableWithoutFeedback, Keyboard, TextInput, FlatList, AsyncStorage, TouchableOpacity } from 'react-native';
import {
  Text, Row,
} from 'native-base';
import {getApiCallWithPromise} from "../../utils/PromiseApiCall";
import {Url} from '../../utils/constant/Url';
import Spinner from '../../universal/components/Spinner';

let ViewSpinner = Spinner(View);
export default class PointTable extends Component {
    state = {
        itemDataSource: [ ],
        isLoading: false
    };

    componentDidMount(){
        {this._getPointTableDetails()}
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
                Keyboard.dismiss();
            }} >
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color:'#2A367D', fontSize: 26 }}>Flat 28</Text>
                    </View>
                    <View style={{flexDirection: 'row',  borderBottomWidth:1}}>
                        <View style={{  width: '70%'}}>
                            <Text style={{ margin:10, fontWeight: 'bold', fontSize: 18, width: 175 }}> Member Name </Text>
                        </View>
                        <View style={{  width: '30%', alignItems : 'center'}}>                        
                        <Text style={{  margin:10,  fontWeight: 'bold', fontSize: 18 }}> Points</Text>
                        </View>
                    </View>
                {this._renderFlatList()}
                </View>
            </TouchableWithoutFeedback>
            </ViewSpinner>
        );
    }

    _renderFlatList() {
        return (
            <View style={{ flex: 6 }}>
                <FlatList
                    data={this.state.itemDataSource}
                    renderItem={item => (
                        <View style={{flexDirection: 'row',  borderBottomWidth:1}}>
                        <View style={{  width: '70%'}}>
                          <Text style={{ margin:10,  fontSize: 16, width: 175 }}>{item.item.user.name} </Text>
                          </View>
                          <View style={{  width: '30%', alignItems : 'center'}}>                        
                          <Text style={{  margin:10, fontSize: 16 }}> {item.item.total_point}</Text>
                          </View>
                        </View>
                    )}
                />
            </View>
        )
    }

    _getPointTableDetails(){
        const mergeURL = Url.userGroupsMembersUrl + AsyncStorage.getItem('groupId') + '/members'
        getApiCallWithPromise(mergeURL, AsyncStorage.getItem('token'))
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

