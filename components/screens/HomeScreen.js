import React, { Component, useContext } from 'react'
import * as Font from 'expo-font'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView, Modal, TouchableHighlight } from 'react-native'
import { Icon, Button } from 'native-base'
import MenuDrawer from 'react-native-side-drawer'
import Header from '../Header'
import SideBar from '../SideBar'
import styled from 'styled-components'
import { globals, componentStyles, colors } from '../GlobalStyles'
import * as Print from 'expo-print';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

// this is our clobal context module to store global session state across screens
import UserContext from '../../UserContext'

// we need to import all images for react native
import popcorn from '../../assets/img/popcorn.gif'

const dimensions = Dimensions.get('window')
const imageHeight = Math.round(dimensions.width * 9 / 16)
const imageWidth = dimensions.width

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      modalVisible: false,
      assetsLoaded: false,
      selectedPrinter: null,
      notification: {},
      token: '',
    }
      
    this.toggleOpen = this.toggleOpen.bind(this)

  }
  
  static contextType = UserContext

  setModalVisible(value) {
    this.setState({ modalVisible: value })
  }

  async registerForPushNotificationsAsync() {
    const { isLoggedIn, user, setUser, setToken } = this.context
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    setToken(token);
  }
  
  async componentDidMount() {
    const { isLoggedIn, user } = this.context
    isLoggedIn()
    await Font.loadAsync({
      'poppins-normal': require('../../assets/fonts/Poppins_400_normal.ttf')
    });
    this.setState({ assetsLoaded: true })

    // NOTIFICATIONS
    this.registerForPushNotificationsAsync();
    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);

  }

  _handleNotification = (notification) => {
    this.setState({notification: notification.data.message});
    this.setModalVisible(true)
  };

  updateUserToken(user) {
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText)
      }
    }

    var theUrl = "http://bluechipadvertising.com/setUser.php?site_id=3"
    xmlhttp.open("POST", theUrl)
    xmlhttp.setRequestHeader("Content-Type", "application/jsoncharset=UTF-8")
    xmlhttp.send(JSON.stringify({ user: user }))
  }

  toggleOpen() {
    this.setState({ open: !this.state.open })
  }

  drawerContent = () => {
    return (
      <TouchableOpacity style={componentStyles.animatedBox}>
        <SideBar navigation={this.props.navigation} toggleOpen={this.toggleOpen} />
      </TouchableOpacity>
    )
  }

  print() {
    Print.printAsync(
      {html: "test print"}
    )
  }

  render() {
    
    const { assetsLoaded } = this.state
    const { user } = this.context

    let continueButton = user ? "StartPickup" : "Login";

    if(assetsLoaded) {
      return (
          <MenuDrawer 
          open={this.state.open} 
          drawerContent={this.drawerContent()}
          drawerPercentage={65}
          animationTime={250}
          overlay={true}
          opacity={0.4}
          >   
              <Header navigation={this.props.navigation} toggleOpen={this.toggleOpen} />
              
              <ScrollView style={styles.container}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.modalVisible}
                  onRequestClose={() => {
                    Alert.alert("Notification has been closed.")
                  }}
                >
                  <View style={styles.modalContainer}>
                  <ScrollView contentContainerStyle={styles.modalInner}>
                    <Text>{this.state.notification}</Text>
                  </ScrollView>
                    <TouchableHighlight
                      style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible)
                      }}
                    >
                      <Text style={styles.modalButton}>CLOSE NOTIFICATION</Text>
                    </TouchableHighlight>
                  </View>
                </Modal>
                <Image style={{ height: imageHeight, width: imageWidth, marginTop: 65 }} source={popcorn} />
                
                <Button onPress={() => this.props.navigation.navigate(continueButton)} style={styles.primaryButton} block>
                    <Text style={styles.joinButtonsText}>START PICKUP ORDER</Text>
                </Button>
                
                <View style={{ flexDirection: "row", justifyContent: "center", paddingBottom: 40 }}>
                  <Button onPress={() => this.props.navigation.navigate("NewAccount")} style={styles.joinButtons} transparent>
                      <Text style={styles.joinButtonsText}>Join</Text>
                  </Button>
                  <Button onPress={() => this.props.navigation.navigate("Login")} style={styles.joinButtons} transparent>
                      <Text style={styles.joinButtonsText}>Login</Text>
                  </Button>
                </View>

              </ScrollView>

          </MenuDrawer>
      )
    }
    else {
      return(
        <View><Text>Loading</Text></View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    height: "100%"
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
    padding: 30
  },
  modalInner: { 
    backgroundColor: 'white', 
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 16,
    paddingBottom: 16
  },
  modalButton: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 12
  },
  joinButtons: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    padding: 20,
  },
  joinButtonsText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    fontFamily: 'poppins-normal'
  },
  primaryButton: {
    backgroundColor: colors.primary,
    width: "75%",
    alignSelf: "center",
    marginTop: 50
  }
})
