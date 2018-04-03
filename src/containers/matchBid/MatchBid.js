import React,{ Component } from "react";
import { View, Text, TouchableOpacity , Image, TextInput, Picker} from 'react-native'
import {H1,H2,H3  } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

class MatchBid extends Component{
    state = {
        text:'',
        firstSelect:'#fff',
        secondSelect:'#fff',
        player:'Select Player'
    }
    render(){
        return(
            <View style = {styles.parentView}>
                <View style = {styles.childView}>

                <Text
                style= {styles.textView}>Today's Matches</Text>

            <View
              style = {styles.rowView}>
                <TouchableOpacity 
                style={[styles.touchable,{borderColor:this.state.firstSelect}]}
                onPress={()=> this.setState({
                    firstSelect:'#668cff',
                    secondSelect:'#fff'
                })}>
                    <Image
                    style= {styles.iconView}
                    source = {require('../../assets/ipl_dd.png')}/>
                </TouchableOpacity>
                    <H1>Vs</H1>
                 <TouchableOpacity
                 style={[styles.touchable,{borderColor:this.state.secondSelect}]}
                 onPress={()=> this.setState({
                    secondSelect :'#668cff',
                    firstSelect:'#fff'
                })}>
                    <Image
                    style= {styles.iconView}
                    source = {require('../../assets/ipl_dd.png')}/>
                </TouchableOpacity>
                
            </View>
        <View
        style = {[styles.rowView, {justifyContent:'center'}]}>
        <H1>Bit</H1>

        <TextInput
        style={{height: 40,marginLeft:10, width:80, fontSize:20}}
        keyboardType={'numeric'}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />

            </View>

              <H2
              style= {{textAlign:'center', top:10, margin:10}}>Bouns Question : (400 Point )</H2>

              <H1
              style= {{textAlign:'center', marginTop:10}}>Who will be the man of the match ?</H1>

        <View 
        style = {{alignItems:'center'}}>
            <Picker
                selectedValue={this.state.player}
                style={{width:150}}
                onValueChange={(itemValue, itemIndex) => this.setState({player: itemValue})}>
                <Picker.Item label="Select Player" value="Select Player" />
                <Picker.Item label="Dhoni" value="Dhoni" />
                <Picker.Item label="Rohit Sharma" value="Rohit Sharma" />
            </Picker>
                </View>

                </View>
                {this._bottomView()}
       
            </View>
        )
    }
    _bottomView =() =>{
        return(
            <View style = {styles.secondChildView}>
                <TouchableOpacity 
                style = {{marginStart:10}}>
                <Icon name="home" size={40} color="#668cff" />
                </TouchableOpacity>

                <TouchableOpacity>
                <Icon name="area-chart" size={40} color="#668cff" />
                </TouchableOpacity>

                <TouchableOpacity 
                style = {{marginEnd:10}}>
                <Icon name="cog" size={40} color="#668cff" />
                </TouchableOpacity>
                </View>
        )
    }
}
const styles = {
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
        fontSize:50,
        color:'#ff8533',
        textAlign:'center',
        fontWeight:'500', 
        margin:30
    },
    iconView:{
        resizeMode:'contain',
        height:200,
        width:170
    },
    secondChildView:{
        flex:.8,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#E7E7E7'
    },
    childView:{
        flex:10
    },
    parentView: {
        flex:1,
        backgroundColor:'#fff'
    }
}
export default MatchBid;
