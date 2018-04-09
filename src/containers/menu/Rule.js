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

                    <Text style={{ fontWeight: 'bold', color:'black' ,fontSize: 20, textAlign: 'center' }}>
                        Rules:
                    </Text>
                
                    <Text style={{marginTop: 5,marginEnd:5, fontSize: 17, width: '100%' }}>
                    1. One can bid points in the range of 100 to 500 for the first 25 matches. The range will increase to 500-1000 for the next 27 matches and will be 1000-2000 for the eliminators and final match.</Text>

                     <Text style={{ marginTop: 5,marginEnd:5, fontSize: 17, width: '100%' }}>
                     2. The distribution of points for winners at the end of each match will be as below:

                           </Text>

                             <Text style={{ marginTop: 5,marginEnd:5, marginStart:10,fontSize: 17, width: '100%' }}>
                      If there are 4 persons in a group A, B, C and D and their bids are A-200, B-300, C-300 and D-200. So, in total the bid for the group is 1000.
                       </Text>

  <Text style={{ marginTop: 5,marginEnd:5, marginStart:10, fontSize: 17, width: '100%' }}>
If A and B both had bid for the winning team, C and D had bid for the loosing team. 
Then at the end of the match A and B will be awarded portions of the total bid (1000 points) in the ratio of their bids i.e A will be rewarded with 400 points and B will be given 600 points.
Points bid by C and D will be deducted from their total points.
So if this bid was for the 1st match then at the end of the match the score tally would be
A->400, B->600, C-> -300 and D-> -200 .
</Text>

                        <Text style={{ marginTop: 5,marginEnd:5, fontSize: 17, width: '100%' }}>
                        3. For all the matches quote's have to be submitted by 3 PM on the day of the match .
                       </Text>

                        <Text style={{ marginTop: 5,marginEnd:5, fontSize: 17, width: '100%' }}>
                        4. Points can be quoted only once and cannot be updated at any point of time.
                       </Text>

                    <Text style={{ marginTop: 5,marginEnd:5,  fontSize: 17, width: '100%' }}>
                    5. If a person doesn't quote for a match by the deadline of 3 PM then a penalty of 300 points will be deducted from his total.
                 </Text>

                    <Text style={{  marginTop: 5,marginEnd:5, fontSize: 17, width: '100%' }}>
                        6. Points can be quoted once & cannot be changed later.
                </Text>

                    <Text style={{ marginTop: 5,marginEnd:5, fontSize: 17, width: '100%' }}>
                        7. If the points are not quoted before deadline, it will be treated as
                         "Not Played" & a penalty of -300 points for each match will be imposed.
                </Text>

                    <Text style={{marginTop: 5,marginEnd:5, fontSize: 17, width: '100%' }}>
                    8. In case a match is cancelled or draw then no points will be awarded or deducted.
                </Text>


                    <Text style={{ marginTop: 5,marginEnd:5, fontSize: 17, width: '100%' }}>
                        9. Plan for the party on the Final match of IPL. 1st, 2nd, 3rd rank will be party
                         poopers & will get the free party. The rest will share the contribution according
                          to their position. Last person in the points table will be the highest contributor, 
                          2nd last with 2nd highest and on.
                 </Text>

                    <Text style={{ fontWeight: 'bold', textAlign: 'center', marginBottom:10
                     , fontSize: 20, width: '100%' }}>
                        ALL THE BEST...!!!!
                 </Text>

            
                </ScrollView>
            </View>
        );
    }
}
