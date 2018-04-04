import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ImageBackground,
  Picker
} from "react-native";
import { H1, H2, H3 } from "native-base";

class MatchBid extends Component{
    state = {
        text:'',
        firstSelect:'transparent',
        secondSelect:'transparent',
        player:'Select Player'
    }
    render() {
        return (
            <View style={styles.parentView}>
                <View style={styles.childView}>
                    <Text
                        style={styles.textView}>Today's Matches</Text>
                        <ImageBackground 
                        source={require("../../assets/iplCard.jpg")}
                        style = {{ backgroundColor:'#fff',shadowOpacity:.5,
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
                                source={require('../../assets/ipl_dd.png')} />
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
                                source={require('../../assets/ipl_dd.png')} />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={[styles.rowView, { justifyContent: 'center', borderBottom:'#fff' }]}>
                        <Text style = {{fontSize: 18 , color:'#ECF0F1'}}>Points</Text>
                        <TextInput
                            style={styles.inputText}
                            keyboardType={'numeric'}
                            maxLength= {4}
                            underlineColorAndroid={'transparent'}
                            onChangeText={(text) => this.setState({ text })}
                            value={this.state.text}
                        />
                    </View>
                    </ImageBackground>
                </View>
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
         borderBottomWidth:1,
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
