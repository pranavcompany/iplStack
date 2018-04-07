/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * Pranav Manikpure
 */

import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import GenericHeader from '../../universal/components/GenericHeader';

export default class Rule extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
                <GenericHeader
                    navigation={this.props.navigation}
                    headerTitle={"Rule Book"} />
                <ScrollView style={{ height: '90%' ,
                     marginStart :10, marginTop:10,marginBottom:20}}>

                    <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>
                        Rules:
                    </Text>
                
                    <Text style={{marginTop: 5,marginEnd:5, fontSize: 17, width: '100%' }}>
                        1. For first 25 matches, point range will be between 100-500 points.
                         For next 27 matches it will be increased to 500-1000.
                          And for last 4 matches it will be between 1000-2000.</Text>

                     <Text style={{ marginTop: 5,marginEnd:5, fontSize: 17, width: '100%' }}>
                            2. Points will be summed up for all the players. 
                            And will be divided to all the winners depending on their percentage share.
                                If 4 members'(A,B,C,D) quotes are A - 200,B - 300,C - 300,C - 200. And if 
                                A & B win then they will get 400 points and B will get 600 points.
                           </Text>

                        <Text style={{ marginTop: 5,marginEnd:5, fontSize: 17, width: '100%' }}>
                            3. Higher winner prediction will get more share than others.
                       </Text>

                        <Text style={{ marginTop: 5,marginEnd:5, fontSize: 17, width: '100%' }}>
                            4. Looser member's points will be deducted exactly by the amount. 
                            If A's quote is 200 & if he looses then it will be -200.
                       </Text>

                    <Text style={{ marginTop: 5,marginEnd:5,  fontSize: 17, width: '100%' }}>
                        5. For all matches quotes have to be submitted by 3 PM.
                 </Text>

                    <Text style={{  marginTop: 5,marginEnd:5, fontSize: 17, width: '100%' }}>
                        6. Points can be quoted once & cannot be changed later.
                </Text>

                    <Text style={{ marginTop: 5,marginEnd:5, fontSize: 17, width: '100%' }}>
                        7. If the points are not quoted before deadline, it will be treated as
                         "Not Played" & a penalty of -500 points for each match will be imposed.
                </Text>

                    <Text style={{marginTop: 5,marginEnd:5, fontSize: 17, width: '100%' }}>
                        8.In case the match is cancelled/drawn, it will be cancelled out for everybody.
                </Text>


                    <Text style={{ marginTop: 5,marginEnd:5, fontSize: 17, width: '100%' }}>
                        9. Plan for the party on the Final match of IPL. 1st, 2nd, 3rd rank will be party
                         poopers & will get the free party. The rest will share the contribution according
                          to their position. Last person in the points table will be the highest contributor, 
                          2nd last with 2nd highest and on.
                 </Text>

                    <Text style={{ fontWeight: 'bold', textAlign: 'center', margin: 5, fontSize: 20, width: '100%' }}>
                        ALL THE BEST...!!!!
                 </Text>

            
                </ScrollView>
            </View>
        );
    }
}