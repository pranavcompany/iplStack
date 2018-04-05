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
export default class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name:'',
      email: '',
      phone: '',
      password: '',
      confrimPassword: ''
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }} >
      <Container style = {{backgroundColor:'white'}}>
        <View  style = {{ marginTop: 10, flexDirection : 'row',justifyContent:'center'}}>
        <Image
          style={{width: 200, height: 200, resizeMode:'contain'}}
          source={Assets.iPLLogo}
        />
        </View>
        <View style = {{margin : 10}}>
          <Form>
            <Item floatingLabel >
              <Label>Name</Label>
              <Input
                onChangeText={(name) => this.setState({ name })}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Email</Label>
              <Input secureTextEntry={true}
                onChangeText={(email) => this.setState({ email })}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Phone Number</Label>
              <Input secureTextEntry={true}
              keyboardType = {'number-pad'}
                onChangeText={(phone) => this.setState({ phone })}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input secureTextEntry={true}
                onChangeText={(password) => this.setState({ password })}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Confirm Password</Label>
              <Input secureTextEntry={true}
                onChangeText={(confrimPassword) => this.setState({ confrimPassword })}
              />
            </Item>
          </Form>
        </View>
        <View style= {{flexDirection : 'row', alignItems: 'center',  marginStart: 'auto', marginEnd: 'auto'}}>
        <Button style= {{justifyContent:'center', marginEnd: 35,  backgroundColor: '#2A367D'}} onPress={() => this._loginButtonPress()}>
            <Text> B A C K </Text>
          </Button>
          <Button style= {{justifyContent:'center', marginStart: 35,  backgroundColor: '#2A367D'}} onPress={() => this._loginButtonPress()}>
            <Text> R E G I S T E R </Text>
          </Button>
        </View>
      </Container>
      </TouchableWithoutFeedback>
    );
  }

  _loginButtonPress = () => {
    const { navigate } = this.props.navigation;

    navigate('LoginScreen')
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