import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native'
import { Icon, Button } from 'native-base'
import MenuDrawer from 'react-native-side-drawer'
import Header from '../Header'
import SideBar from '../SideBar'
import { globals, componentStyles, colors } from '../GlobalStyles'

export default class AdminScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      assetsLoaded: false,
      open: false,
    }

    this.toggleOpen = this.toggleOpen.bind(this)

  }

  componentDidMount() {

  }

  drawerContent = () => {
    return (
      <TouchableOpacity style={componentStyles.animatedBox}>
        <SideBar navigation={this.props.navigation} toggleOpen={this.toggleOpen} />
      </TouchableOpacity>
    )
  }

  toggleOpen() {
    this.setState({ open: !this.state.open })
  }

  render() {

    return (
      <MenuDrawer 
        open={this.state.open} 
        drawerContent={this.drawerContent()}
        drawerPercentage={65}
        animationTime={250}
        overlay={true}
        opacity={0.4}
      >   
          <Header navigation={this.props.navigation} leftButton="interior" toggleOpen={this.toggleOpen} />
          
          <ScrollView style={{...componentStyles.paddingBox, ...colors.bgWhite}}>
            <View style={styles.pageTitleWrap}>
              <Text style={styles.pageTitle}>ADMIN AREA</Text>
            </View>
            <View style={styles.interiorBody}>
              <View style={styles.buttonWrap}>
                <Button onPress={() => this.props.navigation.navigate("AdminFood")} style={styles.primaryButton} iconLeft block large>
                  <Icon style={{ fontSize: 40 }} type="MaterialCommunityIcons" name='food' />
                  <Text style={styles.primaryButtonText}> FOOD</Text>
                </Button>
              </View>
              <View style={styles.buttonWrap}>
                <Button onPress={() => this.props.navigation.navigate("AdminOrders")} style={styles.primaryButton} iconLeft block large>
                  <Icon style={{ fontSize: 38 }} type="MaterialCommunityIcons" name='format-list-bulleted' />
                  <Text style={styles.primaryButtonText}> ORDERS</Text>
                </Button>
              </View>
            </View>
          </ScrollView>

      </MenuDrawer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  pageTitleWrap: {
    alignItems: "center"
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: "bold"
  },
  buttonWrap: {
    padding: 12,
    width: "50%",
  },
  interiorBody: {
    flexDirection: "row"
  },
  primaryButton: {
    backgroundColor: 'rgb(24, 190, 190)',
    marginTop: 20,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 18,
    marginRight: 12
  }
})