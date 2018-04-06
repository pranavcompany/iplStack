import {
    StackNavigator,
  } from 'react-navigation';
import Login from '../../src/containers/login/Login';  
import SignUp from '../../src/containers/login/SignUp'; 
import CreateGroup from '../../src/containers/group/CreateGroup'; 
import GroupList from '../../src/containers/group/GroupList'; 
import AddMember from '../../src/containers/group/AddMember'; 
import Dashboard from '../containers/matchBid/Dashboard'
import ChangePassword from '../containers/menu/ChangePassword'
import Rule from '../containers/menu/Rule'

const AppNavigation = StackNavigator({
  LoginScreen: { screen: Login },
  SignUpScreen: { screen: SignUp },
  CreateGroupScreen: { screen: CreateGroup },
  GroupListScreen: {screen: GroupList},
  AddMemberScreen:{screen: AddMember},
  DashboardScreen:{screen: Dashboard},
  ChangePasswordScreen:{screen: ChangePassword},
  RuleScreen:{screen: Rule}
  
}, {
    // see next line
    mode: "none",
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false
    }
  });

  export default AppNavigation;