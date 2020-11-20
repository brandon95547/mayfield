import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { Left, Right, Icon, Drawer, Container } from 'native-base';
import { globals, componentStyles, headerStyles } from './GlobalStyles';
import UserContext from '../UserContext'

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        
    }

    static contextType = UserContext
    
    
      render() {
        const { user } = this.context

        let continueButton = user ? "Cart" : "Login";

          let leftButton = <View style={headerStyles.viewRow}>
            <TouchableOpacity style={headerStyles.logo}>
                <Icon style={{color: "white"}} type="MaterialCommunityIcons" name='movie-roll' />
            </TouchableOpacity>

            <Text style={headerStyles.logoText}>Mayfield Drive In</Text>
        </View>;
        if(this.props.leftButton == "interior") {
            leftButton = <View style={headerStyles.viewRow}>
                <TouchableOpacity style={headerStyles.logo} onPress={() => this.props.navigation.goBack()}>
                    <Icon style={{color: "white"}} type="MaterialIcons" name='arrow-back' />
                </TouchableOpacity>
            </View>
        }
        return (
            <>
                <View style={headerStyles.viewContainer}>
                    {leftButton}

                    <View style={headerStyles.viewHamburger}>
                        <TouchableOpacity style={headerStyles.hamburger} onPress={() => {this.props.navigation.navigate(continueButton)}}>
                            <Icon style={{color: "white"}} type="MaterialCommunityIcons" name='cart' />
                        </TouchableOpacity>
                        <TouchableOpacity style={headerStyles.hamburger} onPress={this.props.toggleOpen}>
                            <Icon style={{color: "white"}} type="MaterialCommunityIcons" name='menu' />
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        );
      }
}