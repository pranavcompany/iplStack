import React, { Component } from "react";
import { View, Image } from "react-native";
import { Tab, Tabs, TabHeading } from "native-base";
import Schedule from "./Schedule";
import GenericHeader from '../../universal/components/GenericHeader';
import MatchBid from './MatchBid'
import PointTable from './PointTable'
<<<<<<< Updated upstream
import Icon from 'react-native-vector-icons/FontAwesome';
=======
import MatchWisePoint from './MatchWisePoint'

>>>>>>> Stashed changes

class Dashboard extends Component {
  header({ iconName}) {
    return (
<<<<<<< Updated upstream
      <TabHeading 
      activeTabStyle= {{backgroundColor:'black'}}
      style={{backgroundColor: '#11BCCA' }}>
        <Icon 
       name= {iconName} size={30} color="#4F8EF7" />
=======
      <TabHeading style={{backgroundColor: '#919cda' }}>
        <Icon
          name={iconName}
          type={"MaterialCommunityIcons"}
          style={{ color: "#2A367D" }}
          size={50}
        />
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        >
          {this.tabView("calendar-check", MatchBid)}
          {this.tabView("sort-numeric-up", PointTable)}
          {this.tabView("calendar-alt", Schedule)}
=======
          onChangeTab={(index) => this.setState({
            headerTitle: index.i == 0 ? "Today's Matches" : index.i == 1 ?  "Point Table" : index.i == 2 ? "Match Wise Quotes" :  index.i == 3 ? "Schedule" : "Pranav"
        })}>
          {this.tabView("bell-ring", MatchBid)}
          {this.tabView("chart-bar", PointTable)}
          {this.tabView("table", MatchWisePoint)}
          {this.tabView("format-list-bulleted", Schedule)}
>>>>>>> Stashed changes
        </Tabs>
        </View>
    );
  }
}


export default Dashboard;
