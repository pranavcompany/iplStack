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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

let ViewSpinner = Spinner(View);
class MatchBid extends Component{
    state = {
        player:'Select Player',
        itemDataSource: [],
        manageQuote: [],
        isLoading: false,
        token:"",
        memberId:"",
        groupId:'',
    }

    componentDidMount(){
        AsyncStorage.getItem("token").then((value2) => {
            this.setState({token:value2});
          }).done();
          AsyncStorage.getItem("memberId").then((value2) => {
            this.setState({memberId:value2});
          }).done();

          AsyncStorage.getItem("groupId").then((value2) => {
            this.setState({groupId:value2});
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
                 <KeyboardAwareScrollView
      style={{ backgroundColor: 'white' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.keyboardAvoidingViewStyle}
      scrollEnabled={true}
    >
                <View style={styles.parentView}>
                    <View style={styles.childView}>
                    {this.state.itemDataSource.map((item, index) =>{
                            return(
                                <ImageBackground
                                source={require("../../assets/iplCard.jpg")}
                                style={{
                                    backgroundColor: '#ffffff', shadowOpacity: .5,
                                    shadowRadius: 10, margin: 10, padding: 5
                                }}>
                                <View
                                    style={styles.rowView}>
                                    <TouchableOpacity
                                        style={[styles.touchable, item.team1.selected == true ? { borderColor: 'white' } : { borderColor: 'transparent' }]}
                                        onPress={() => { this._selectedTeam(item, item.team1.abb,index) }}>
                                        <Image
                                            style={styles.iconView}
                                            source={this._matchIconWithServerName(item.team1.abb)} />
                                    </TouchableOpacity>
                                    <H2> VS </H2>
                                    <TouchableOpacity
                                        style={[styles.touchable,item.team2.selected == true ? { borderColor: 'white' } : { borderColor: 'transparent' }]}
                                        onPress={() => { this._selectedTeam(item, item.team2.abb, item.index) }}>
                                        <Image
                                            style={styles.iconView}
                                            source={this._matchIconWithServerName(item.team2.abb)} />
                                    </TouchableOpacity>
                                </View>
                                <View style={[styles.rowView,
                                { justifyContent: 'space-evenly', borderBottom: '#ffffff' }]}>

                                  {
                                        (item.bids && item.bids.length > 0) ? 
                                     <TextInput
                                        style={styles.inputText}
                                        keyboardType={'numeric'}
                                        maxLength={4}
                                        placeholder={'Enter Quote'}
                                        placeholderTextColor={'#000'}
                                        underlineColorAndroid={'transparent'}
                                        value={(item.bids && item.bids.length) ? item.bids[0].bid_point : ""}
                                        onChangeText={(quote) => { this._createQuoteDetails(item, quote) }}
                                    /> :
                                        <TextInput
                                        style={styles.inputText}
                                        keyboardType={'numeric'}
                                        maxLength={4}
                                        placeholder={'Enter Quote'}
                                        placeholderTextColor={'#000'}
                                        underlineColorAndroid={'transparent'}
                                        onChangeText={(quote) => { this._createQuoteDetails(item, quote) }}
                                    /> 
                                  }
                                        {(item.bids && item.bids.length) ? null :
                                            <TouchableOpacity style={{ marginStart: 30, backgroundColor: '#E7E7E7', borderWidth: 1, borderRadius: 10 }}
                                                onPress={() => { this._letsQuote(item) }}
                                            >
                                                <Text
                                                    style={{ color: 'black', fontWeight: 'bold', fontSize: 18, padding: 10 }}>
                                                    Quote </Text>
                                            </TouchableOpacity>
                                        }
                                   
                                </View>
                            </ImageBackground>
                            )
                    }
                    
                    )}
                        
                    </View>
                </View>
                </KeyboardAwareScrollView>
            </ViewSpinner>
        )
    }
 
  
    _getTodayMatchDetails(){
        
        const url = '?group_id='
        getApiCallWithPromise(Url.todayUrl+url+this.props.groupId, this.state.token)
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

    _enterQuotesValue(item){
        this.state.manageQuote.map((currentDetails, index) => {
            if (item.id === currentDetails.match_id) {
                quoteDetails = currentDetails
                return quoteDetails.bid_point
            }
        })
        if (item.bids && item.bids.length){
          return  item.bids[0].bid_point
        } 
        return ""
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

    _selectedTeam(matchDetails, selectedTeam, index){
        var selectedTeams = this.state.itemDataSource 
        if(this.state.itemDataSource.length > 0){
            selectedTeams.map((currentDetails, index) =>{
                if (currentDetails.id == matchDetails.id) {
                    if (matchDetails.team1.abb == selectedTeam) {
                        matchDetails.team1.selected = true
                        matchDetails.team2.selected = false
                        selectedTeams[index] = matchDetails
                    }else if (matchDetails.team2.abb == selectedTeam) {
                        matchDetails.team2.selected = true
                        matchDetails.team1.selected = false
                        selectedTeams[index] = matchDetails
                    }
                }
            })
        }
        this.setState({
            itemDataSource: selectedTeams
        })
    }


    _createQuoteDetails(matchDetails, enterQuote){
        if (this.state.manageQuote.length > 0) {
            var quoteDetails = this.state.manageQuote 
            this.state.manageQuote.map((currentDetails, index) => {
                if (currentDetails.match_id === matchDetails.id) {
                    var selected_bid_point = enterQuote == null ?  enterQuote != "" ? currentDetails.bid_point : enterQuote : enterQuote
                    var selected = {
                        "match_id": matchDetails.id,
                        "bid_point": selected_bid_point
                    }
                        quoteDetails[index] = selected 
                }else{
                    var selected_bid_point = enterQuote == null ?  enterQuote != "" ? currentDetails.bid_point : enterQuote : enterQuote
                    var selected = {
                        "match_id": matchDetails.id,
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
                "bid_point": enterQuote
            }
            detailsArray.push(selected)  
            this.setState({manageQuote: detailsArray})
        }       
    }

    _letsQuote = (matchDetails) => {
        var quoteDetails = {}
        var details = {}
        var selectedTeam =""
        var isValidate = true
        var errorMsg = ""
        this.state.manageQuote.map((currentDetails, index) => {
            if (matchDetails.id === currentDetails.match_id) {
                quoteDetails = currentDetails
            }
        })
        if (quoteDetails.bid_point == null || quoteDetails.bid_point.length == 0) {
          isValidate = false
          Alert.alert("Please enter quote")
        } else if (quoteDetails.bid_point < matchDetails.min_bid || quoteDetails.bid_point >= matchDetails.max_bid) {
            isValidate = false
            Alert.alert("Please enter quote between "+ matchDetails.min_bid+ "to"+ matchDetails.max_bid+"")
        }

        this.state.itemDataSource.map((currentDetails, index) => {
            if (matchDetails.id === currentDetails.id) {
                details = currentDetails
                if (details.team1.selected == false && details.team2.selected == false) {
                    isValidate = false
                    Alert.alert("Please select teams")
                  }else {
                      if (details.team1.selected) {
                          selectedTeam = details.team1.abb
                      }else if(details.team2.selected)  {
                          selectedTeam = details.team2.abb
                      }
                  } 
            }
        })


    if (isValidate) {
        const body = {
            "match_id": quoteDetails.match_id,
            "member_id": this.state.memberId,
            "bid_team": selectedTeam,
            "bid_point": quoteDetails.bid_point
        }
        this.setState({ isLoading: true })
      postApiCallWithPromise(Url.letsBid, body, this.state.token)
        .then(response => {
            if (response.status == 200) {
                this.setState({ isLoading: false })
                alert("Quote added successfully!!")
            }else {
                alert("Quote not added. Try again")
            }
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
