import React, { Component } from "react";
import { View, Image } from "react-native";
import { Tab, Tabs, TabHeading, Icon } from "native-base";
import Tab1 from "./TabView";
import GenericHeader from '../../universal/components/GenericHeader';
import MatchBid from './MatchBid'
import PointTable from '../pointDetails/PointTable'

class Dashboard extends Component {
  header({ iconName }) {
    return (
      <TabHeading style={{backgroundColor: '#2A367D' }}>
        <Icon
          name={iconName}
          type={"MaterialCommunityIcons"}
          style={{ color: "gray" }}
          size={50}
        />
      </TabHeading>
    );
  }

  tabView(iconName, Comp) {
    return (
      <Tab heading={this.header({ iconName })}>
        <Comp />
      </Tab>
    );
  }

  render() {
    return (
      <View style ={{flex:1}}>
      <GenericHeader
      isShow={false}
      navigation={this.props.navigation}
      navigateTo = 'CreateGroupScreen'
      headerTitle={"Group List"} />
        <Tabs
        tabBarPosition={'top'}
          tabBarUnderlineStyle={{
            backgroundColor: "#5693CE"
          }}
        >
          {this.tabView("format-list-bulleted", MatchBid)}
          {this.tabView("bell-ring", PointTable)}
          {this.tabView("pill", Tab1)}
        </Tabs>
        </View>
    );
  }
}


export default Dashboard;
