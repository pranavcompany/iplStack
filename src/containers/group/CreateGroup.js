/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * Pranav Manikpure
 */

import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback, Keyboard, TextInput, FlatList, TouchableOpacity } from 'react-native';
import {
    Container,
    Content,
    Form,
    Item,
    Label,
    Button,
    Text,
    Input,
    Toast
} from 'native-base';
import Assets from "../../assets/index";
import GridView from "react-native-super-grid";
import GenericHeader from '../../universal/components/GenericHeader'

export default class CreateGroup extends Component {

<<<<<<< Updated upstream
    state = {
        itemDataSource: ['pranav', 'pranav', 'pranav', 'pranav', 'pranav', 'pranav', 'pranav', 'pranav', 'pranav', 'pranav']
    };
    render() {
        const { navigate } = this.props.navigation;
        return (

            <Container>
                <GenericHeader
                    navigation={this.props.navigation}
                    headerTitle={"Create Group"} />
                <Content
                scrollEnabled= {true}
                style={{marginTop:50}}>
                    <Form
                    style={{margin:5}}>
                        <Item floatingLabel>
                            <Label>Enter Group Name</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Member Count</Label>
                            <Input />
                        </Item>
                    </Form>
        <TouchableOpacity style={{
                        margin: 15, backgroundColor: '#2A367D', justifyContent: 'center',
                        alignItems: 'center', borderRadius: 10, padding: 10
=======
    render() {
        const { navigate } = this.props.navigation;
        return (
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss();
            }} >
            <View style={ {flex:1,backgroundColor: 'white' }}>
            <GenericHeader
            navigation={this.props.navigation}
            headerTitle={"Create Group"} />
                <View style={{marginTop: 20, alignItems:'center', justifyContent: 'center'}}>
                    <View style ={ {flexDirection: 'row', marginTop: 10}}> 
                    <View style = {{width: "40%"}}>
                    <Text style={{ marginStart: 20, fontWeight: 'bold', fontSize: 18 }}>Group Name</Text>
                    </View>
                    <View style = {{width: "60%"}}>
                    <TextInput
                    placeholder={"Enter Group Name"}
                    underlineColorAndroid="transparent"
                    onChangeText={text => this.setState({ GroupName: text })}
                    style={{ fontSize: 15, borderBottomWidth: 1, marginEnd:20}}
                    />
                    </View>
                    </View>
                    <View style ={ {flexDirection: 'row', marginTop:20}}> 
                    <View style = {{width: "40%"}}>
                    <Text style={{ marginStart: 10, fontWeight: 'bold', fontSize: 18 }}>Member Count</Text>
                    </View>
                    <View style = {{width: "60%"}}>
                    <TextInput
                    maxLength={2}
                    placeholder={"Enter Member Count"}
                    keyboardType={"numeric"}
                    underlineColorAndroid="transparent"
                    onChangeText={text => this.setState({ MemberCount: text })}
                    style={{ marginBottom: 10,fontSize: 15, borderBottomWidth: 1, marginEnd:20}}
                    />     
                    </View>   
                    </View>
                </View>
                    <TouchableOpacity style={{ margin: 15, backgroundColor: '#2A367D', justifyContent: 'center',
                        alignItems: 'center', borderRadius: 10, padding:10
>>>>>>> Stashed changes
                    }} onPress={() => {
                        navigate('AddMemberScreen')
                    }}>
                        <Text style={{ color: 'white', fontSize: 18 }}> C R E A T E </Text>
                    </TouchableOpacity>
                </Content>
            </Container>
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
    }, selectedButtonBackgroundColor: {
        backgroundColor: '#0099cc',
    }
}