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

export default class GroupList extends Component {

    state = {
        itemDataSource: ['pranav', 'pranav', 'pranav', 'pranav', 'pranav', 'pranav', 'pranav', 'pranav', 'pranav', 'pranav']
    };
    render() {
        const { navigate } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
            }} >
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{ flex: 1, marginTop: 30, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Group List</Text>
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
                        <View style={{ margin: 5, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderRadius: 10 }}>
                            <TouchableOpacity style={{
                                flex: .5, margin: 15, justifyContent: 'center',
                                alignItems: 'center', borderRadius: 10
                            }} onPress={() => {
                                navigate('SignUpScreen')
                            }}>
                                <Text> {item.item}  </Text>
                            </TouchableOpacity>
                            />
                        </View>
                    )}
                />
            </View>
        )
    }
}
