/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * Pranav Manikpure
 */

import React, { Component  } from 'react';
import { View, Image, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Url} from '../../utils/constant/Url'
import validator from 'validator';
import Spinner from '../../universal/components/Spinner'
import {postApiCallWithPromise} from "../../utils/PromiseApiCall"

let ViewSpinner = Spinner(View);

export default class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name:'',
      email: '',
      phone: '',
      password: '',
      conformPassword: '',
      isLoading: false
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (

      <ViewSpinner
      style={{ flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center'}}
      isLoading={this.state.isLoading}
    >

      <KeyboardAwareScrollView
      style={{ backgroundColor: '#4c69a5' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.keyboardAvoidingViewStyle}
      scrollEnabled={true}
    >

      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }} >
      <Container style = {{backgroundColor:'white'}}>
        <View  style = {{ marginTop: 10, flexDirection : 'row',justifyContent:'center'}}>
        <Image
          style={{width: 200, height: 120, marginTop:20, resizeMode:'contain'}}
          source={Assets.iPLLogo}
        />
        </View>
        <View style = {{margin : 5, padding:10}}>
          <Form>
            <Item floatingLabel >
              <Label>Name</Label>
              <Input
                onChangeText={(name) => this.setState({ name })}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Email</Label>
              <Input 
              autoCapitalize = {'none'}
               keyboardType = {'email-address'}
                onChangeText={(email) => this.setState({ email })}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Phone Number</Label>
              <Input 
              keyboardType = {'numeric'}
              maxLength = {10}
                onChangeText={(phone) => this.setState({ phone })}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input secureTextEntry={true}
              autoCapitalize = {'none'}
                onChangeText={(password) => this.setState({ password })}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Confirm Password</Label>
              <Input secureTextEntry={true}
              autoCapitalize = {'none'}
                onChangeText={(conformPassword) => this.setState({ conformPassword })}
              />
            </Item>
          </Form>
        </View>
        <View style= {{flexDirection : 'row', alignItems: 'center',  marginStart: 'auto', marginEnd: 'auto', marginTop: 10}}>
          <Button style= {{justifyContent:'center',borderRadius:10, marginEnd: 35,  backgroundColor: '#2A367D'}} onPress={() => this._loginButtonPress()}>
            <Text> R E G I S T E R </Text>
          </Button>
          <Button style= {{justifyContent:'center', borderRadius:10,marginStart: 35,  backgroundColor: '#2A367D'}} onPress={() => this._backButtonPress()}>
          <Text> B A C K </Text>
        </Button>
        </View>
      </Container>
      </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
      </ViewSpinner>
    );
  }
  _backButtonPress = () => {
    const { goBack } = this.props.navigation;
    goBack()
  }

  _loginButtonPress = () => {
    const { replace } = this.props.navigation;
    var isValidate = true
    var errorMsg = ""
    if ( validator.isEmpty(this.state.name)) {
      isValidate = false
      Alert.alert("Please enter name")
    }else if ( validator.isEmpty(this.state.email)) {
      isValidate = false
      Alert.alert("Please enter email")
    }else if (validator.isEmail(this.state.email) === false) {
      isValidate = false
      Alert.alert("Please enter valid emailId")
    } else if (validator.isEmpty(this.state.phone)) {
      isValidate = false
      Alert.alert( "Please enter phone")
    } else if(this.state.phone.length != 10) {
      isValidate = false
      Alert.alert( "Please enter only 10 digit mobile number")
     } else if (validator.isEmpty(this.state.password)) {
      isValidate = false
      Alert.alert( "Please enter password")
    }else if (this.state.password.length < 6) {
      isValidate = false
      Alert.alert( "Passwords must be at least 6 characters")
    } else if (validator.isEmpty(this.state.conformPassword)) {
      isValidate = false
      Alert.alert( "Please enter conform conformPassword")
    }else if (this.state.conformPassword.length < 6 ) {
      isValidate = false
      Alert.alert( "Passwords must be at least 6 characters")
    } else if (!validator.equals(this.state.conformPassword, this.state.password)) {
      isValidate = false
      Alert.alert( "Please enter conform conformPassword")
    } 
    
if (isValidate) {
  const body = {
    "name": this.state.name,
    "email": this.state.email,
    "password": this.state.password,
    "phone":this.state.conformPassword,
    }
    this.setState({ isLoading: true })
  postApiCallWithPromise(Url.userRegisterUrl, body)
    .then(response => {
      this.setState({ isLoading: false })
      if (response.status == 200) {
        Alert.alert(
          "Success",
          "Registration Successful !",
          [
            { text: "OK", onPress: () => replace('LoginScreen')}
          ],
          { cancelable: false }
        )  
      }
    })
    .catch(function(error) {
      this.setState({ isLoading: false })
      reject(error);
    });
}
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