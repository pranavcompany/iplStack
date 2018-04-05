import React, { Component } from "react";
import { View, Image } from "react-native";
import { Tab, Tabs, TabHeading, Icon } from "native-base";
import Schedule from "./Schedule";
import GenericHeader from '../../universal/components/GenericHeader';
import MatchBid from './MatchBid'
import PointTable from './PointTable'
// import Icon from 'react-native-vector-icons/FontAwesome';
import MatchWisePoint from './MatchWisePoint'


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

  tabView(iconName, Comp) {
    return (
      <Tab heading={this.header({ iconName})}>
        <Comp />
      </Tab>
    );
  }
  
  state = {
    headerTitle: "Today's Match"
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
            headerTitle: index.i == 0 ? "Today's Matches" : index.i == 1 ?  "Point Table" : index.i == 2 ? "Match Wise Quotes" :  index.i == 3 ? "Schedule" : "Home"
        })}>
          {this.tabView("bell-ring", MatchBid)}
          {this.tabView("chart-bar", PointTable)}
          {this.tabView("table", MatchWisePoint)}
          {this.tabView("format-list-bulleted", Schedule)}
        </Tabs>
        </View>
    );
  }
}


export default Dashboard;
