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
} from 'native-base';
import Assets from "../../assets/index";
import {postApiCallWithPromise} from "../../utils/PromiseApiCall"
import {Url} from '../../utils/constant/Url'
import validator from 'validator';
import Spinner from '../../universal/components/Spinner'


let ViewSpinner = Spinner(View);
export default class SingleMember extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      emailId: '',
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
        <View style = {{margin : 10, padding:10}}>
          <Form>
            <Item stackedLabel >
              <Label>Name</Label>
              <Input
              autoCapitalize = {'none'}
              keyboardType = {'email-address'}
                onChangeText={(name) => this.setState({ name })}
              />
            </Item>
            <Item stackedLabel >
              <Label>Email Id</Label>
              <Input 
              autoCapitalize = {'none'}
               onChangeText={(emailId) => this.setState({ emailId })}
              />
            </Item>
          </Form>
        </View>
        <View style= {{marginTop:20,
        alignItems: 'center',  marginStart: 'auto', marginEnd: 'auto'}}>
          <Button style= {{justifyContent:'center', borderRadius:10,
           backgroundColor: '#2A367D'}} onPress={() => this._loginButtonPress()}>
            <Text> Add </Text>
          </Button>
        </View>
      </Container>
      </TouchableWithoutFeedback>
      </ViewSpinner>
    );
  }


  _loginButtonPress = () => {
    var isValidate = true
    var errorMsg = ""
    if (validator.isEmpty(this.state.name)) {
      isValidate = false
      Alert.alert("Please enter member name")
    } else if (validator.isEmpty(this.state.emailId)) {
      isValidate = false
      Alert.alert("Please enter email Id")
    } else if (validator.isEmail(this.state.emailId) == false) {
        isValidate = false
        Alert.alert("Please enter valid email Id")
      } 
    if (isValidate) {
      const body = {
        "name": this.state.name,
        "email": this.state.emailId,
      }
      this.setState({ isLoading: true })
      const finalURL  = Url.addMember + this.props.groupId +"/member/add"
      postApiCallWithPromise(finalURL, body, this.props.token)
        .then(response => {
          this.setState({ isLoading: false })
          if (response.status == 200) {
            this.setState({
              name: "",
              emailId: ""
            })
            Alert.alert(
              "Success",
              "Member Added successfully!",
              [
                { text: "OK" }
              ],
              { cancelable: false }
            )
          }
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