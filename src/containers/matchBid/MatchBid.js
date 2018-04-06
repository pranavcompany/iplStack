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
        player:'Select Player',
        itemDataSource: [],
        manageQuote: [],
        isLoading: false,
        token:"",
        memberId:"",
    }

    componentDidMount(){
        AsyncStorage.getItem("token").then((value2) => {
            this.setState({token:value2});
          }).done();
          AsyncStorage.getItem("memberId").then((value2) => {
            this.setState({memberId:value2});
            this._getTodayMatchDetails()
          }).done();
    }

    render() {
        return (
            <ViewSpinner
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                    justifyContent: 'center'
                }}
                isLoading={this.state.isLoading}>
                <View style={styles.parentView}>
                    <View style={styles.childView}>
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
                                            style={[styles.touchable, item.item.bids[0].bid_team == "" ? { borderColor: 'transparent' } : item.item.bids[0].bid_team == item.item.abb1 ? { borderColor: 'white' } : { borderColor: 'transparent' }]}
                                            onPress={() => { this._createQuoteDetails(item.item, item.item.abb1, null) }}>
                                            <Image
                                                style={styles.iconView}
                                                source={this._matchIconWithServerName(item.item.abb1)} />
                                        </TouchableOpacity>
                                        <H2>Vs</H2>
                                        <TouchableOpacity
                                            style={[styles.touchable, item.item.bids[0].bid_team == "" ? { borderColor: 'transparent' } : item.item.bids[0].bid_team == item.item.abb2 ? { borderColor: 'white' } : { borderColor: 'transparent' }]}
                                            onPress={() => { this._createQuoteDetails(item.item, item.item.abb2, null) }}>
                                            <Image
                                                style={styles.iconView}
                                                source={this._matchIconWithServerName(item.item.abb2)} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={[styles.rowView,
                                    { justifyContent: 'space-evenly', borderBottom: '#ffffff' }]}>
                                      
                                        <TextInput
                                            style={styles.inputText}
                                            keyboardType={'numeric'}
                                            maxLength={4}
                                            placeholder={'Enter Quote'}
                                            placeholderTextColor={'#000'}
                                            underlineColorAndroid={'transparent'}
                                            value={item.item.bids[0].bid_point}
                                            onChangeText={(quote) => { this._createQuoteDetails(item.item, null, quote) }}
                                        />
                                        <TouchableOpacity style={{ marginStart: 30, backgroundColor: '#E7E7E7', borderWidth: 1, borderRadius: 10 }}
                                            onPress={() => { this._letsQuote(item.item) }}
                                        >
                                            <Text
                                                style={{ color: 'black', fontWeight: 'bold', fontSize: 18, padding: 10 }}>
                                                Quote </Text>
                                        </TouchableOpacity>
                                    </View>
                                </ImageBackground>
                            )} />
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

    _createQuoteDetails(matchDetails,selectedTeam, enterQuote){
        if (this.state.manageQuote.length > 0) {
            var quoteDetails = this.state.manageQuote 
            this.state.manageQuote.map((currentDetails, index) => {
                if (currentDetails.match_id === matchDetails.id) {
                var selected_bid_team =  selectedTeam == null ?  currentDetails.bid_team  :  selectedTeam
                var selected_bid_point = enterQuote == null ?  enterQuote != "" ? currentDetails.bid_point : enterQuote : enterQuote
                var selected = {
                    "match_id": matchDetails.id,
                    "bid_team": selected_bid_team,
                    "bid_point": selected_bid_point
                }
                    quoteDetails[index] = selected 
                }else{
                var selected_bid_team =  selectedTeam == null ?  currentDetails.bid_team  :  selectedTeam
                var selected_bid_point = enterQuote == null ?  enterQuote != "" ? currentDetails.bid_point : enterQuote : enterQuote
                var selected = {
                    "match_id": matchDetails.id,
                    "bid_team": selected_bid_team,
                    "bid_point": selected_bid_point
                }
                    quoteDetails.push(selected)          
                }
            })
            this.setState({
                manageQuote : quoteDetails
            })
        }else{
            var detailsArray = []
            var selected = {
                "match_id": matchDetails.id,
                "bid_team": selectedTeam,
                "bid_point": enterQuote
            }
            detailsArray.push(selected)  
            this.setState({manageQuote: detailsArray})
        }       
    }

    _letsQuote = (matchDetails) => {
        var quoteDetails = {}
        this.state.manageQuote.map((currentDetails, index) => {
            if (matchDetails.id === currentDetails.match_id) {
                quoteDetails = currentDetails
            }
        })
        var isValidate = true
        var errorMsg = ""
        if (quoteDetails.bid_team == null) {
            isValidate = false
            Alert.alert("Please select team")
        }else if (quoteDetails.bid_point == null || quoteDetails.bid_point.length == 0) {
          isValidate = false
          Alert.alert("Please enter quote")
        } else if (quoteDetails.bid_point < matchDetails.min_bid || quoteDetails.bid_point >= matchDetails.max_bid) {
            isValidate = false
            Alert.alert("Please enter quote between "+ matchDetails.min_bid+ "to"+ matchDetails.max_bid+"")
        }
    if (isValidate) {
        const body = {
            "match_id": quoteDetails.match_id,
            "member_id": this.state.memberId,
            "bid_team": quoteDetails.bid_team,
            "bid_point": quoteDetails.bid_point
        }
        this.setState({ isLoading: true })
      postApiCallWithPromise(Url.letsBid, body, this.state.token)
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
        textAlign:'center',
         padding: 10, 
         backgroundColor:'rgba(255,255,255,.5)',
         marginLeft: 20, 
         width: 150, 
         borderRadius:10,
         fontSize: 20 , 
         paddingLeft:10,
         borderWidth:1,
         color:'#FFFF'
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
