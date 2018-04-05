import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  FlatList,
  Picker
} from "react-native";
import { H1, H2, H3 } from "native-base";
import Icon from "react-native-vector-icons/SimpleLineIcons";

export default class Schedule extends Component {
  state = {
    itemDataSource: [{ member_name: 'Pranav Manikpure', total_point: '50' }, { member_name: 'Sumit Chavan', total_point: '30' }, { member_name: 'Atul Bhangire', total_point: '40' }]
  };
  render() {
    return (
      this._renderFlatList()
    );
  }

  _renderFlatList() {
    return (
      <View style={{ flex: 6 }}>
        <FlatList
          data={this.state.itemDataSource}
          renderItem={item => (
            <ImageBackground
              source={require("../../assets/iplCard.jpg")}
              style={{
                backgroundColor: '#ffffff', shadowOpacity: .5,
                shadowRadius: 10, margin: 10, padding: 5
              }}>
              <View
                style={styles.rowView}>
                <TouchableOpacity
                  style={[styles.touchable, { borderColor: this.state.firstSelect }]}
                  onPress={() => this.setState({
                    firstSelect: '#ECF0F1',
                    secondSelect: 'transparent'
                  })}>
                  <Image
                    style={styles.iconView}
                    source={require('../../assets/MI.png')} />
                </TouchableOpacity>
                <H2>Vs</H2>
                <TouchableOpacity
                  style={[styles.touchable, { borderColor: this.state.secondSelect }]}
                  onPress={() => this.setState({
                    secondSelect: '#ECF0F1',
                    firstSelect: 'transparent'
                  })}>
                  <Image
                    style={styles.iconView}
                    source={require('../../assets/CSK.png')} />
                </TouchableOpacity>
              </View>
           </ImageBackground>
          )}
        />
      </View>
    )
  }
}


const styles = {
  inputText: {
    height: 40,
    marginLeft: 10,
    width: 80,
    fontSize: 20,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: '#ECF0F1',
    color: '#ECF0F1'
  },
  touchable:
    {
      borderWidth: 1,
      margin: 15,
      padding: 10,
      borderRadius: 10
    },
  rowView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  textView: {
    fontSize: 25,
    color: '#ff8533',
    textAlign: 'center',
    fontWeight: '500',
    margin: 20
  },
  iconView: {
    resizeMode: 'contain',
    height: 100,
    width: 120
  },
  secondChildView: {
    flex: .8,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E7E7E7'
  },
  childView: {
    flex: 10,
  },
  parentView: {
    flex: 1,
    backgroundColor: '#fff'
  }
}