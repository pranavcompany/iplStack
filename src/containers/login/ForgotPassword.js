/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * Pranav Manikpure
 */

import React, { Component  } from 'react';
import { View, Image, TouchableWithoutFeedback, Keyboard ,TouchableOpacity, Alert, PermissionsAndroid } from 'react-native';
import SplashScreen from 'react-native-smart-splash-screen'
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
import {postApiCallWithPromise} from "../../utils/PromiseApiCall"
import {Url} from '../../utils/constant/Url'
import validator from 'validator';
import Spinner from '../../universal/components/Spinner'


let ViewSpinner = Spinner(View);
export default class Login extends Component {

constructor(props) {
    super(props);
    this.state = {
      email: '',
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
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }} >
      <Container style = {{backgroundColor:'white'}}>
        <View  style = {{ marginTop: 80, flexDirection : 'row',justifyContent:'center'}}>
        <Image
          style={{width: 200, height: 150, resizeMode:'contain'}}
          source={Assets.iPLLogo}
        />
        </View>
        <View style = {{margin : 10, padding:10}}>
          <Form>
            <Item floatingLabel >
              <Label>Email Id</Label>
              <Input
                value={this.state.email}
                autoCapitalize = {'none'}
                keyboardType = {'email-address'}
                onChangeText={(email) => this.setState({ email })}
              />
            </Item>
          </Form>
        </View>
        <View style= {{marginTop:10,flexDirection : 'row', alignItems: 'center',  
        marginStart: 'auto', marginEnd: 'auto'}}>
          <Button style= {{justifyContent:'center', backgroundColor: '#2A367D', borderRadius:10}} onPress={() => this._loginButtonPress()}>
            <Text> Submit </Text>
          </Button>
          
        </View>
      </Container>
      </TouchableWithoutFeedback>
      </ViewSpinner>
    );
  }

  _backButtonPress(){
    const { goBack } = this.props.navigation;
    goBack()
  }
  _loginButtonPress = () => {
    const { replace } = this.props.navigation;
    var isValidate = true
    var errorMsg = ""
    if ( validator.isEmpty(this.state.email)) {
      isValidate = false
      Alert.alert("Please enter email")
    }else if (validator.isEmail(this.state.email) === false) {
      isValidate = false
      Alert.alert("Please enter valid emailId")
    } 
if (isValidate) {
  const body = {
    "email": this.state.email,
    }
    this.setState({ isLoading: true })
  postApiCallWithPromise(Url.forgot, body)
    .then(response => {
      this.setState({ isLoading: false })
      Alert.alert(
        "Success",
      "  New Password send to your mail !",
        [
          { text: "OK", onPress: () => replace('LoginScreen')}
        ],
        { cancelable: false }
      )
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