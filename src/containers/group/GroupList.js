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

export default class GroupList extends Component {

    state = {
        itemDataSource: ['pranav']
    };
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss()
            }} >
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Group List</Text>
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
                        <TouchableOpacity onPress={() => {
                            navigate('PointTableScreen')
                        }}>
                        <View style={{ margin: 5, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 10 }}>
                            <Text> Group Name:  Flat 28  </Text>
                            />
                        </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }
}
