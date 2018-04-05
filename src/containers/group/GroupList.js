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
                <GenericHeader
                    isShow={true}
                    navigation={this.props.navigation}
                    navigateTo = 'CreateGroupScreen'
                    headerTitle={"Group List"} />
                    {this._renderFlatList()}
                </View>
            </TouchableWithoutFeedback>
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
<<<<<<< Updated upstream
                        <View style={{ 
                            margin: 5, backgroundColor: '#7F86B1',
                             alignItems: 'center', justifyContent: 'center', 
                             borderWidth: 1, borderRadius: 10 , marginTop: 20}}>
                            <Text 
                            style={{color: 'white', fontWeight: 'bold', 
                            fontSize: 18, padding: 10}}> Group Name:  Flat 28  </Text>
=======
                        <View style={{ marginStart: 30, marginEnd: 30, backgroundColor: '#919cda', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: "#2A367D", borderRadius: 10 , marginTop: 20, shadowOpacity:.5, shadowRadius:1}}>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 24, marginTop: 10}}>  Flat 28  </Text>
                            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 14, marginBottom: 10}}>  Members: 8 </Text>
                            />
>>>>>>> Stashed changes
                        </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }
}
