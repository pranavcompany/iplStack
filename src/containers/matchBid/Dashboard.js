import React, { Component } from "react";
import { View, Image, AsyncStorage } from "react-native";
import { Tab, Tabs, TabHeading, Icon } from "native-base";
import Schedule from "./Schedule";
import GenericHeader from '../../universal/components/GenericHeader';
import MatchBid from './MatchBid'
import PointTable from './PointTable'
import MatchWisePoint from './MatchWisePoint'
import SingleMember from './SingleMember'


class Dashboard extends Component {
  header({ iconName}) {
    return (
      <TabHeading style={{backgroundColor: '#919cda' }}>
        <Icon
          name={iconName}
          type={"MaterialCommunityIcons"}
          style={{ color: "#2A367D" }}
          size={50}
        />
      </TabHeading>
    );
  }
  componentDidMount(){
    const {params}= this.props.navigation.state
    this.saveKey(params.groupId,params.memberId)
}

  async saveKey(groupId,memberId) {
    try {
      await AsyncStorage.setItem('groupId', groupId.toString());
      await AsyncStorage.setItem('memberId', memberId.toString());
    } catch (error) {
      console.log("Error saving data" + error);
    }
}

  tabView(iconName, Comp) {
    const {params}= this.props.navigation.state
    return (
      <Tab heading={this.header({ iconName})}>
        <Comp 
          groupId = {params.groupId} 
          token = {param.token}
        />
      </Tab>
    );
  }
  
  state = {
    headerTitle: "Today's Matches"
  }

  render() {
    return (
      <View style ={{flex:1}}>
      <GenericHeader
      navigation={this.props.navigation}
      headerTitle={this.state.headerTitle} />
        <Tabs
        tabBarPosition={'top'}
          tabBarUnderlineStyle={{
            backgroundColor: "#2A367D"
          }}
          onChangeTab={(index) => this.setState({
            headerTitle: index.i == 0 ? "Today's Matches" : index.i == 1 ?  "Points Table" : index.i == 2 ? "Matchwise Quotes" :  index.i == 3 ? "Schedule" : index.i == 4 ? "Add Member" : "Home"
        })}>
          {this.tabView("bell-ring", MatchBid)}
          {this.tabView("chart-bar", PointTable)}
          {this.tabView("table", MatchWisePoint)}
          {this.tabView("format-list-bulleted", Schedule)}
          {this.tabView("plus", SingleMember)}
        </Tabs>
        </View>
    );
  }
}


export default Dashboard;
