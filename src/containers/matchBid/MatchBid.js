import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  Picker,
  FlatList,
  Alert,
  AsyncStorage
} from "react-native";
import { H1, H2, H3 } from "native-base";
import {getApiCallWithPromise, postApiCallWithPromise} from "../../utils/PromiseApiCall";
import {Url} from '../../utils/constant/Url';
import Spinner from '../../universal/components/Spinner';
import Assets from '../../assets'

let ViewSpinner = Spinner(View);
class MatchBid extends Component{
    state = {
        quote:'',
        firstSelect:'transparent',
        secondSelect:'transparent',
        player:'Select Player',
        itemDataSource: [],
        isLoading: false,
        token:""
    }

    componentDidMount(){
        AsyncStorage.getItem("token").then((value2) => {
            this.setState({token:value2});
            this._getTodayMatchDetails()
          }).done();
    }

    render() {
        return (
            <ViewSpinner
            style={{ flex: 1,
              backgroundColor: 'white',
              justifyContent: 'center'}}
            isLoading={this.state.isLoading}
          >
            <View style={styles.parentView}>
                <View style={styles.childView}>
                <FlatList
          data={this.state.itemDataSource}
          renderItem={item => (
                        <ImageBackground 
                        source={require("../../assets/iplCard.jpg")}
                        style = {{ backgroundColor:'#ffffff',shadowOpacity:.5,
                                    shadowRadius:10,margin:10, padding: 5}}>
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
                                source={this._matchIconWithServerName(item.item.abb1)} />
                        </TouchableOpacity>
                        <H2>Vs</H2>
                        <TouchableOpacity
                            style={[styles.touchable, { borderColor: this.state.secondSelect }]}
                            onPress={() => this.setState({
                                secondSelect: '#ECF0F1',
                                firstSelect: 'transparent'
                            })
                            }>
                            <Image
                                style={styles.iconView}
                                source={this._matchIconWithServerName(item.item.abb2)} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.rowView,
                         { justifyContent: 'space-evenly', borderBottom:'#ffffff' }]}>
                        <Text 
                        style = {{fontSize: 18 , color:'#ECF0F1'}}>Quote</Text>
                        <TextInput
                            style={styles.inputText}
                            keyboardType={'numeric'}
                            maxLength= {4}
                            underlineColorAndroid={'transparent'}
                            onChangeText={(quote) => enterQoute = quote }
                            value={this.state.quote}
                        />
                        <TouchableOpacity style={{ marginStart: 30, backgroundColor: '#E7E7E7', borderWidth: 1, borderRadius:10}}
                        onPress={() => {this._letsQuote(item.item, enterQoute)}}
                        >
                            <Text
                             style={{color: 'black', fontWeight: 'bold', fontSize: 18, padding: 10 }}>
                              let's Quote </Text>
                        </TouchableOpacity>
                    </View>
                    </ImageBackground>
          )}/>
                </View>
            </View>
            </ViewSpinner>
        )
    }

    _getTodayMatchDetails(){
        getApiCallWithPromise(Url.todayUrl, this.state.token)
        .then(response => {
          this.setState({ isLoading: false, 
                        itemDataSource: response.data })
          console.log(response.data)
        })
        .catch(function(error) {
          this.setState({ isLoading: false })
          console.log(error)
          reject(error);
        });
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

    _letsQuote = (matchDetails, enterQoute, selectedTeam) => {
        var isValidate = true
        var errorMsg = ""
        if (enterQoute >= matchDetails.max_bid ) {
          isValidate = false
          Alert.alert("Please enter quote between "+ matchDetails.min_bid+ "to"+ matchDetails.max_bid+"")
        } else if (selectedTeam) {
            isValidate = false
            Alert.alert("Please select team")
        } 
    if (isValidate) {
        const body = {
            "match_id": matchDetails.id,
            "member_id": AsyncStorage.getItem('memberId'),
            "bid_team": "MI",
            "bid_point": enterQoute
        }
        this.setState({ isLoading: true })
      postApiCallWithPromise(Url.letsBid, body, AsyncStorage.getItem('token'))
        .then(response => {
          this.setState({ isLoading: false })
        })
        .catch(function(error) {
          this.setState({ isLoading: false })
          reject(error);
        });
    }
     }

}

const styles = {
    inputText:{
         height: 40, 
         marginLeft: 10, 
         width: 80, 
         fontSize: 20 , 
         paddingLeft:10, 
         borderWidth:1,
         borderColor: '#ECF0F1',
         color:'#ECF0F1'
        },
    touchable:
        {borderWidth:1, 
            margin: 15,
             padding:10,
             borderRadius:10
    },
    rowView:{
        alignItems:'center', 
        flexDirection: 'row',
        justifyContent:'space-around'
    },
    textView:{
        fontSize:25,
        color:'#ff8533',
        textAlign:'center',
        fontWeight:'500', 
        margin:20
    },
    iconView:{
        resizeMode:'contain',
        height:100,
        width:120
    },
    secondChildView:{
        flex:.8,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#E7E7E7'
    },
    childView:{
        flex:10,
    },
    parentView: {
        flex:1,
        backgroundColor:'#fff'
    }
}
export default MatchBid;
