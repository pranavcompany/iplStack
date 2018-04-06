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
import {getApiCallWithPromise} from "../../utils/PromiseApiCall";
import {Url} from '../../utils/constant/Url';
import Spinner from '../../universal/components/Spinner';
import Assets from '../../assets'


let ViewSpinner = Spinner(View);

export default class Schedule extends Component {
  state = {
    itemDataSource: [],
    isLoading: false
  };
  render() {
    return (
      this._renderFlatList()
    );
  }

  componentDidMount(){
    {this._getAllMatchesList()}
}

  _renderFlatList() {
    return (
      <ViewSpinner
            style={{ flex: 1,
              backgroundColor: 'white',
              justifyContent: 'center'}}
            isLoading={this.state.isLoading}
          >
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
              <View style={{ flexDirection: 'column' }}>
                <Text
                  style={styles.textView}>Match - {item.item.id}</Text>
              </View>
              <View
                style={styles.rowView}>
                  <Image
                    style={styles.iconView}
                    source={this._matchIconWithServerName(item.item.abb1)} />
                <H2 style={{color: 'white'}}>Vs</H2>
                  <Image
                    style={styles.iconView}
                    source={this._matchIconWithServerName(item.item.abb2)} />
              </View>
              <Text
                  style={styles.dateTextView}> {item.item.date}  {item.item.time} </Text>
              {item.item.winner_statement ?  <View style={{ flexDirection: 'column' }}>
              <Text
                style={styles.textView}>Winner - {item.item.winner_statement}</Text>
            </View>: null }
           </ImageBackground>
          )}
        />
      </View>
      </ViewSpinner>
    )
  }


  _matchIconWithServerName(name){
    switch (name) {
      case 'MI':
        return Assets.MI
      case 'CSK':  
      return Assets.CSK
      case 'SRH':  
      return Assets.SRH
      case 'RCB':  
      return Assets.RCB
      case 'KKR':
      return Assets.KKR
      case 'DD':
      return Assets.DD
      case 'KXIP':
      return Assets.KXIP
      case 'RR':
      return Assets.RR
      default:
      return Assets.TBD
    }
  }

  _getAllMatchesList(){
    getApiCallWithPromise(Url.allMatchesList)
    .then(response => {
      this.setState({ isLoading: false, 
                    itemDataSource: response.data })
    })
    .catch(function(error) {
      this.setState({ isLoading: false })
      console.log(error)
      reject(error);
    });
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
  },dateTextView:{
    fontSize:18,
    color:'#ffffff',
    textAlign:'center',
    fontWeight:'500', 
}
}