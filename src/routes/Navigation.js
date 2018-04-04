import {
    StackNavigator,
  } from 'react-navigation';
import Login from '../../src/containers/login/Login';  
import SignUp from '../../src/containers/login/SignUp'; 
import CreateGroup from '../../src/containers/group/CreateGroup'; 
import GroupList from '../../src/containers/group/GroupList'; 
import PointTable from '../containers/pointDetails/PointTable'
import MatchBid from '../containers/matchBid/MatchBid'
import Dashboard from '../containers/matchBid/Dashboard'

const AppNavigation = StackNavigator({
  LoginScreen: { screen: Login },
  SignUpScreen: { screen: SignUp },
  CreateGroupScreen: { screen: CreateGroup },
  GroupListScreen: {screen: GroupList},
  PointTableScreen: {screen: PointTable},
  MatchBidScreen: { screen: MatchBid },
  DashboardScreen:{screen: Dashboard}
}, {
    // see next line
    mode: "none",
    headerMode: "none",
    navigationOptions: {
      gesturesEnabled: false
    }
  });

  export default AppNavigation;