import React, { Component } from "react";
import { View, Image } from "react-native";
import { Tab, Tabs, TabHeading } from "native-base";
import Schedule from "./Schedule";
import GenericHeader from '../../universal/components/GenericHeader';
import MatchBid from './MatchBid'
import PointTable from './PointTable'
import Icon from 'react-native-vector-icons/FontAwesome';

class Dashboard extends Component {
  header({ iconName }) {
    return (
      <TabHeading 
      activeTabStyle= {{backgroundColor:'black'}}
      style={{backgroundColor: '#11BCCA' }}>
        <Icon 
       name= {iconName} size={30} color="#4F8EF7" />
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
          {this.tabView("calendar-check", MatchBid)}
          {this.tabView("sort-numeric-up", PointTable)}
          {this.tabView("calendar-alt", Schedule)}
        </Tabs>
        </View>
    );
  }
}


export default Dashboard;
