/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * Pranav Manikpure
 */

import React, { Component  } from 'react';
import { View, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Toast
} from 'native-base';
import Assets from "../../assets/index";
export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }} >
      <Container style = {{backgroundColor:'white'}}>
        <View  style = {{ marginTop: 30, flexDirection : 'row',justifyContent:'center'}}>
        <Image
          style={{width: 150, height: 150}}
          source={Assets.iPLLogo}
        />
        </View>
        <View style = {{margin : 30}}>
          <Form>
            <Item floatingLabel >
              <Label>Username</Label>
              <Input
                onChangeText={(username) => this.setState({ username })}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input secureTextEntry={true}
                onChangeText={(password) => this.setState({ password })}
              />
            </Item>
          </Form>
        </View>
        <View style= {{flexDirection : 'row', alignItems: 'center',  marginStart: 'auto', marginEnd: 'auto'}}>
          <Button style= {{justifyContent:'center', marginEnd: 35}} onPress={() => this._loginButtonPress()}>
            <Text> Sign In </Text>
          </Button>
          <Button style= {{justifyContent:'center', marginStart: 35}} onPress={() => navigate('SignUpScreen')} >
            <Text> Sign Up  </Text>
          </Button>
        </View>
      </Container>
      </TouchableWithoutFeedback>
    );
  }

  _loginButtonPress = () => {
    const { navigate } = this.props.navigation;

    navigate('CreateGroupScreen')
    // var isValidate = true
    // var errormsg = ""
    // if (this.state.email.length == 0) {
    //   isValidate = false
    //   errormsg = "Please enter email";
    // }
    // if (this.state.password.length == 0) {
    //   isValidate = false
    //   errormsg = "Please enter password";
    // }
    // if (this.state.password.length >= 8) {
    //   isValidate = false
    //   errormsg = "Password atleast 8 character login";
    // }

    // Toast.show({
    //   text: errormsg,
    //   position: 'top',
    //   buttonText: 'Okay'
    // })
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
}