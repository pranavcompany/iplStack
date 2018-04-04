/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * Pranav Manikpure
 */

import React, { Component  } from 'react';
import { View, Image, TouchableWithoutFeedback, Keyboard, TextInput, FlatList, TouchableOpacity } from 'react-native';
import {
  Text, Row,
} from 'native-base';

export default class PointTable extends Component {
    state = {
        itemDataSource: [{member_name:'Pranav Manikpure',total_point:'50'}, {member_name:'Sumit Chavan',total_point:'30'}, {member_name:'Atul Bhangire',total_point:'40'}]
    };
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
            }} >
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Flat 28</Text>
                    </View>
                    <View style={{flexDirection: 'row', borderTopWidth:1, borderBottomWidth:1}}>
                        <View style={{ borderRightWidth: 1}}>
                            <Text style={{ margin:10, fontWeight: 'bold', fontSize: 18, width: 175 }}> Member Name </Text>
                        </View>
                        <Text style={{  margin:10,  fontWeight: 'bold', fontSize: 18 }}> Points</Text>
                    </View>
                {this._renderFlatList()}
                </View>
            </TouchableWithoutFeedback>
        );
    }

    _renderFlatList() {
        return (
            <View style={{ flex: 6 }}>
                <FlatList
                    data={this.state.itemDataSource}
                    renderItem={item => (
                        <View style={{flexDirection: 'row',  borderBottomWidth:1}}>
                         <View style={{ borderRightWidth: 1}}>
                          <Text style={{ margin:10,  fontSize: 16, width: 175 }}>{item.item.member_name} </Text>
                          </View>
                          <View>
                          <Text style={{  margin:10, fontSize: 16 }}> {item.item.total_point}</Text>
                          </View>
                        </View>
                    )}
                />
            </View>
        )
    }
}
