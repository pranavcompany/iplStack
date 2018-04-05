import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    ImageBackground,
    Picker,
    FlatList
} from "react-native";
import { H1, H2, H3 } from "native-base";

class MatchWisePoint extends Component {

    state = {
        itemDataSource: [{member_name:'Pranav Manikpure',total_point:'50'}, {member_name:'Sumit Chavan',total_point:'30'}, {member_name:'Atul Bhangire',total_point:'40'}]
    };
    render() {
        return (
            <View style={styles.parentView}>
                <View style={styles.childView}>
                    <ImageBackground
                        source={require("../../assets/iplCard.jpg")}
                        style={{
                            backgroundColor: '#ffffff', shadowOpacity: .5,
                            shadowRadius: 10, margin: 10, padding: 5
                        }}>
                        <View style={{flexDirection:'column'}}>
                        <Text
                            style={styles.textView}>Match - 1</Text>
                        <Text
                            style={styles.dateTextView}> 7 Apr</Text>
                        </View>
                        <View
                            style={styles.rowView}>
                            <Image
                                style={styles.iconView}
                                source={require('../../assets/MI.png')} />
                            <H2>Vs</H2>
                            <Image
                                style={styles.iconView}
                                source={require('../../assets/CSK.png')} />
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 10, backgroundColor: 'white' }}>
                    <View style={{flexDirection: 'row',  borderBottomWidth:1}}>
                        <View style={{  width: '70%'}}>
                            <Text style={{ margin:10, fontWeight: 'bold', fontSize: 18, width: 175 }}> Member Name </Text>
                        </View>
                        <View style={{  width: '30%', alignItems : 'center'}}>                        
                        <Text style={{  margin:10,  fontWeight: 'bold', fontSize: 18 }}> Points</Text>
                        </View>
                    </View>
                {this._renderFlatList()}
                </View>
            </View>
        )
    }

    _renderFlatList() {
        return (
            <View style={{ flex: 6 }}>
                <FlatList
                    data={this.state.itemDataSource}
                    renderItem={item => (
                        <View style={{flexDirection: 'row',  borderBottomWidth:1}}>
                        <View style={{  width: '70%'}}>
                          <Text style={{ margin:10,  fontSize: 16, width: 175 }}>{item.item.member_name} </Text>
                          </View>
                          <View style={{  width: '30%', alignItems : 'center'}}>                        
                          <Text style={{  margin:10, fontSize: 16 }}> {item.item.total_point}</Text>
                          </View>
                        </View>
                    )}
                />
            </View>
        )
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
