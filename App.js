/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import AppNavigation from './src/routes/Navigation'
import { Provider } from 'react-redux'
import  {store } from './src/store/index'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <AppNavigation />
      </Provider>
      );
  }
}
