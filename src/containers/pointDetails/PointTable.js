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
                        <Text style={{ fontWeight: 'bold', fontSize: 25 , marginTop: 10 }}>Point Table</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 10 }}>Flat 28</Text>
                    </View>
                    <View style={{flexDirection: 'row', borderWidth: 1 }}>
                          <Text style={{ marginStart:10,  fontSize: 18, width: 200 }}> Member Name </Text>
                          <Text style={{  marginStart:10, fontSize: 18 }}> Points</Text>
                        </View>

                {this._renderFlatList()}
                </View>
            </TouchableWithoutFeedback>
        );
    }

    _renderFlatList() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 6 }}>
                <FlatList
                    data={this.state.itemDataSource}
                    renderItem={item => (
                        <View style={{flexDirection: 'row' }}>
                          <Text style={{ margin:10,   fontSize: 18, width: 200 }}>{item.item.member_name} </Text>
                          <Text style={{  margin:10, fontSize: 18 }}> {item.item.total_point}</Text>
                        </View>
                    )}
                />
            </View>
        )
    }
}
