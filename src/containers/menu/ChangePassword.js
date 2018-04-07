/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * Pranav Manikpure
 */

import React, { Component  } from 'react';
import { View, Image, TouchableWithoutFeedback, Keyboard ,TouchableOpacity, AsyncStorage, Alert} from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  H2,
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
import GenericHeader from '../../universal/components/GenericHeader'

let ViewSpinner = Spinner(View);
export default class ChangePassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      conformPassword: '',
      isLoading: false,
      token:''
    };
  }

  componentDidMount(){
    AsyncStorage.getItem("token").then((value2) => {
        this.setState({token:value2});
      }).done();
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
      <GenericHeader
      navigation={this.props.navigation}
      headerTitle={'Change Password'} />
        <View style = {{margin : 10, padding:10}}>
          <Form>
            <Item floatingLabel >
              <Label>Old Password</Label>
              <Input
              autoCapitalize = {'none'}
                onChangeText={(oldPassword) => this.setState({ oldPassword })}
              />
            </Item>
            <Item floatingLabel last>
              <Label>New Password</Label>
              <Input 
              secureTextEntry={true}
              autoCapitalize = {'none'}
               onChangeText={(newPassword) => this.setState({ newPassword })}
              />
            </Item>
            <Item floatingLabel last>
            <Label>Conform Password</Label>
            <Input 
            secureTextEntry={true}
            autoCapitalize = {'none'}
             onChangeText={(conformPassword) => this.setState({ conformPassword })}
            />
          </Item>
          </Form>
        </View>
        <View style= {{marginTop:20,
        alignItems: 'center',  marginStart: 'auto', marginEnd: 'auto'}}>
          <Button style= {{justifyContent:'center', borderRadius:10,
           backgroundColor: '#2A367D'}} onPress={() => this._loginButtonPress()}>
            <Text> Submit </Text>
          </Button>
        </View>
      </Container>
      </TouchableWithoutFeedback>
      </ViewSpinner>
    );
  }

  _backButtonPress = () => {
    const { goBack } = this.props.navigation;
    goBack()
  }

  _loginButtonPress = () => {
    const { goBack } = this.props.navigation;
    var isValidate = true
    var errorMsg = ""
    if (validator.isEmpty(this.state.oldPassword)) {
      isValidate = false
      Alert.alert("Please enter old passsword")
    } else if (validator.isEmpty(this.state.newPassword)) {
      isValidate = false
      Alert.alert("Please enter new password")
    } else if (validator.isEmpty(this.state.conformPassword)) {
      isValidate = false
      Alert.alert("Please enter conform Password")
    } else if (this.state.newPassword != this.state.conformPassword) {
      isValidate = false
      Alert.alert("New password and Conform password must be same")
    }
    if (isValidate) {
      const body = {
        "old_password": this.state.oldPassword,
        "new_password": this.state.conformPassword,
      }
      this.setState({ isLoading: true })

      postApiCallWithPromise(Url.reset, body, this.state.token)
        .then(response => {
          this.setState({ isLoading: false })
          Alert.alert(
            "Success",
            "Password changed successfully!",
            [
              { text: "OK", onPress: () => goBack()}
            ],
            { cancelable: false }
          )
        })
        .catch(function (error) {
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