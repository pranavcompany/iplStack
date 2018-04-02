import {
    StackNavigator,
  } from 'react-navigation';
import Login from '../../src/containers/login/Login';  
import SignUp from '../../src/containers/login/SignUp'; 

const AppNavigation = StackNavigator({
    LoginScreen: { screen: Login },
    SignUpScreen:{ screen: SignUp },
  },{
    navigationOptions :{
      headerStyle:{
        marginTop : 20
      }
    }
  });

  export default AppNavigation;