import React, { Component } from "react";
import { View, Image } from "react-native";
import { Tab, Tabs, TabHeading, Icon } from "native-base";
import Schedule from "./Schedule";
import GenericHeader from '../../universal/components/GenericHeader';
import MatchBid from './MatchBid'
import PointTable from './PointTable'

class Dashboard extends Component {
  header({ iconName }) {
    return (
      <TabHeading style={{backgroundColor: '#7F86B1' }}>
        <Icon
          name={iconName}
          type={"MaterialCommunityIcons"}
          style={{ color: "#2A367D" }}
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
      navigation={this.props.navigation}
      headerTitle={"Home"} />
        <Tabs
        tabBarPosition={'top'}
          tabBarUnderlineStyle={{
            backgroundColor: "#2A367D"
          }}
        >
          {this.tabView("format-list-bulleted", MatchBid)}
          {this.tabView("bell-ring", PointTable)}
          {this.tabView("pill", Schedule)}
        </Tabs>
        </View>
    );
  }
}


export default Dashboard;
