import { AppRegistry } from 'react-native';
import Login from  './src/containers/login/Login'
import App from './App'

if (typeof process === 'undefined') process = {};
process.nextTick = setImmediate;

module.exports = process;

AppRegistry.registerComponent('iplStack', () => App);
