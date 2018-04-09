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
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {setToken } from '../../action'


let ViewSpinner = Spinner(View);
class Login extends Component {
//atul@e-arth.in, atul123
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false
    };
  }
  componentDidMount () {
    SplashScreen.close({
       animationType: SplashScreen.animationType.scale,
       duration: 850,
       delay: 500,
    })
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
        <View style = {{margin : 10, padding:5}}>
          <Form>
            <Item stackedLabel >
              <Label>Email Id</Label>
              <Input
              autoCapitalize = {'none'}
                keyboardType = {'email-address'}
                value={this.state.username}
                onChangeText={(username) => this.setState({ username })}
              />
            </Item>
            <Item stackedLabel >
              <Label>Password</Label>
              <Input 
              value={this.state.password}
              secureTextEntry={true}
               onChangeText={(password) => this.setState({ password })}
              />
            </Item>
          </Form>
        </View>
        <TouchableOpacity
        style ={{margin:10, alignItems:'flex-end', paddingEnd:10}} 
         onPress={() => navigate('ForgotPasswordScreen')}>
        <Text>Forgot Password</Text>
        </TouchableOpacity>
        <View style= {{marginTop:10,flexDirection : 'row', alignItems: 'center',  marginStart: 'auto', marginEnd: 'auto'}}>
          <Button style= {{justifyContent:'center',
          borderRadius:10, marginEnd: 35, backgroundColor: '#2A367D'}} onPress={() => this._loginButtonPress()}>
            <Text> Sign In </Text>
          </Button>
          <Button style= {{justifyContent:'center',borderRadius:10, marginStart: 35,backgroundColor: '#2A367D'}} onPress={() => navigate('SignUpScreen')} >
            <Text> Sign Up  </Text>
          </Button>
        </View>
      </Container>
      </TouchableWithoutFeedback>
      </ViewSpinner>
    );
  }

  _loginButtonPress = () => {
    const { replace } = this.props.navigation;
    var isValidate = true
    var errorMsg = ""
    if ( validator.isEmpty(this.state.username)) {
      isValidate = false
      Alert.alert("Please enter email")
    }else if (validator.isEmail(this.state.username) === false) {
      isValidate = false
      Alert.alert("Please enter valid emailId")
    } else if (validator.isEmpty(this.state.password)) {
      isValidate = false
      Alert.alert( "Please enter password")
    } 
if (isValidate) {
  const body = {
    "email": this.state.username,
    "password":this.state.password,
    }
    this.setState({ isLoading: true })
  postApiCallWithPromise(Url.userLoginUrl, body)
    .then(response => {

      this.setState({ isLoading: false })
      if (response.status == 200) {
        // this.props.setToken( response.data.token)
        replace('GroupListScreen', {
          token: response.data.token, userId: response.data.user_id,
          email: response.data.email, name: response.data.name
        })
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

// function mapStateToProps(state) {
//   return {
    
//   }
// }

// const  mapDispatchToProps = (dispatch) => {
//   return {
//     setToken:setToken 
//   }
// }

export default Login