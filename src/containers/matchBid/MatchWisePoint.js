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
    AsyncStorage
} from "react-native";
import { H1, H2, H3 } from "native-base";
import {getApiCallWithPromise} from "../../utils/PromiseApiCall";
import {Url} from '../../utils/constant/Url';
import Spinner from '../../universal/components/Spinner';
import Assets from '../../assets'

let ViewSpinner = Spinner(View);
class MatchWisePoint extends Component {
    state = {
        itemDataSourceForBids: [],
        itemDataSourceForMatch: [],
        isLoading: false,
        token:'',
        groupId:''
    };

    componentDidMount(){
        AsyncStorage.getItem("groupId").then((value2) => {
            this.setState({groupId:value2});
            this._getMatchWiseDetails()
          }).done();
        AsyncStorage.getItem("token").then((value2) => {
            this.setState({token:value2});
          }).done();
          
    }

    render() {
        return (
            <View style={styles.parentView}>
                <View style={styles.childView}>
              {this._renderFlatListForMatch()}    
                </View>
            </View>
        )
    }

    _renderFlatList(pointDetails) {
        return (
            <View style={{ flex: 6 }}>
                <FlatList
                    data={pointDetails}
                    renderItem={item => (
                        <View style={{flexDirection: 'row',  borderBottomWidth:1}}>
                        <View style={{  width: '60%'}}>
                          <Text style={{ margin:10,  fontSize: 16, width: 175 }}>{item.item.user.name}</Text>
                          </View>
                          <View style={{  width: '20%', alignItems : 'center'}}>                        
                          <Text style={{  margin:10, fontSize: 16 }}> {item.item.bid_team ? item.item.bid_team : "No Quote"}</Text>
                          </View>
                          <View style={{  width: '20%', alignItems : 'center'}}>                        
                          <Text style={{  margin:10, fontSize: 16 }}> {item.item.bid_point ? item.item.bid_point : "-"+item.item.bid_point}</Text>
                          </View>
                        </View>
                    )}
                />
            </View>
        )
    }
    _renderFlatListForMatch() {
        return (
            <FlatList
                data={this.state.itemDataSourceForMatch}
                renderItem={item => (
                    <View style={{ marginTop: 10}}>
                    <ImageBackground
                        source={require("../../assets/backg.jpg")}
                        style={{
                            backgroundColor: '#ffffff', shadowOpacity: .5,
                            shadowRadius: 10, margin: 10, padding: 5
                        }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text
                                style={styles.textView}>Match - {item.item.id}</Text>
                            <Text
                                style={styles.dateTextView}> {item.item.date}</Text>
                        </View>
                        <View
                            style={styles.rowView}>
                            <Image
                                style={styles.iconView}
                                source={this._matchIconWithServerName(item.item.abb1)} />
                            <H2>Vs</H2>
                            <Image
                                style={styles.iconView}
                                source={this._matchIconWithServerName(item.item.abb2)} />
                        </View>
                    </ImageBackground>
                    {this._renderFlatList(item.item.bids)}
                    </View>
                )} />

        )
    }


_getMatchWiseDetails(){
    const mergeURL = Url.matchWisePoint +  this.state.groupId
    getApiCallWithPromise(mergeURL, this.state.token)
    .then(response => {
        this.setState({ isLoading: false, 
        itemDataSourceForMatch: response.data })
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
            margin: 5,
             padding:5,
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
    },dateTextView:{
        fontSize:18,
        color:'#ffffff',
        textAlign:'center',
        fontWeight:'500', 
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
        flex:5,
    },
    parentView: {
        flex:1,
        backgroundColor:'#fff'
    }
}
export default MatchWisePoint;
