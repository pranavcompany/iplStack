import React, { Component } from 'react';
import { Header, Left, Body, Right, Icon, Title } from 'native-base';
import {TouchableOpacity } from 'react-native'

export default class GenericHeader extends Component {
    render() {
        return (
            <Header style={{ backgroundColor: "white" }} >
                {this._renderHeaderLeftButton()}
                {this._renderHeaderTitle()}
                {this._renderHeaderRightButton()}
            </Header>
        );
    }

  _renderHeaderLeftButton() {
    const {navigate, goBack} = this.props.navigation
        return (
            <Left>
                <Icon
                    onPress={() => this.props.isShow ? navigate('Dashboard') : goBack()}
                    name='arrow-back'
                    style={{ color: 'black', marginLeft: 10, width: 30 }}
                    fontSize={50}
                />
            </Left>
        )
    }
    _renderHeaderTitle() {
        return (
            <Body>
                <Title
                    style={{ color: 'black', width: 200 }}>{this.props.headerTitle}</Title>
            </Body>
        )
    }
    _renderHeaderRightButton() {
        const { goBack, push,} = this.props.navigation
        const { navigateTo } = this.props
        return (
            <Right>
                {
                    this.props.isShow ?
                        <TouchableOpacity onPress={() => push(navigateTo)} >
                            <Icon
                                name='add'
                                style={{ color: 'red', marginRight: 10 }}
                                fontSize={50}
                            />
                        </TouchableOpacity> : null
                }
            </Right>
        )
    }
}