import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, TextInput, Alert } from 'react-native'
import MenuDrawer from 'react-native-side-drawer'
import { Button } from 'native-base'
// custom components
import Header from '../Header'
import SideBar from '../SideBar'
import { globals, componentStyles, colors, spacingStyles } from '../GlobalStyles'
import UserContext from '../../UserContext'

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      email: "",
    }

    this.toggleOpen = this.toggleOpen.bind(this)
    
  }

  static contextType = UserContext

  componentDidMount() {
    // this.checkMultiPermissions()
  }
  
  componentWillUnmount() {

  }

  drawerContent = () => {
    return (
      <TouchableOpacity onPress={this.toggleOpen} style={componentStyles.animatedBox}>
        <SideBar navigation={this.props.navigation} toggleOpen={this.toggleOpen} />
      </TouchableOpacity>
    )
  }

  toggleOpen() {
    this.setState({ open: !this.state.open })
  }

  processForgotPassword() {
    let _this = this
    const { user, setUser } = this.context
    // if the email isn't valid
    if(!this.emailIsValid(this.state.email)) {
      Alert.alert(
        'Alert',
        "Invalid email",
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          { text: 'OK', onPress: () => {} },
        ],
        { cancelable: false }
      );
      return
    }

    var xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText)
        
        Alert.alert(
          'Alert',
          response.message,
          [
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel',
            },
            { text: 'OK', onPress: () => {} },
          ],
          { cancelable: false }
        );
        if(response.success) {
          setTimeout(() => {
            _this.props.navigation.navigate('Login')
          }, 2500)
        }
      }
    }

    var theUrl = "http://bluechipadvertising.com/signup.php?request=forgotPassword&site_id=3"
    xmlhttp.open("POST", theUrl)
    xmlhttp.setRequestHeader("Content-Type", "application/jsoncharset=UTF-8")
    xmlhttp.send(JSON.stringify({email: this.state.email}))

  }

  emailOnChange(email) {
    this.setState({ email: email })
  }

  emailIsValid (email) {
    return /\S+@\S+\.\S+/.test(email)
  }

  render() {

    return (
      <MenuDrawer 
          open={this.state.open} 
          drawerContent={this.drawerContent()}
          drawerPercentage={65}
          animationTime={250}
          overlay={true}s
          opacity={0.4}
        >   

       

        <Header navigation={this.props.navigation} leftButton="interior" toggleOpen={this.toggleOpen} />
        
        <ScrollView style={{...componentStyles.paddingBox, ...colors.bgWhite}}>
          <View style={styles.pageTitleWrap}>
            <Text style={styles.pageTitle}>Forgot Password</Text>
          </View>
          <TextInput style = {styles.textInput}
            underlineColorAndroid = "transparent"
            placeholder = "Enter Email"
            placeholderTextColor = "#888"
            autoCapitalize = "none"
            onChangeText = {email => this.emailOnChange(email)}
          />
          <Button onPress={() => this.processForgotPassword()} block style={styles.submitButton}>
              <Text style={{color: "white", fontWeight: "bold"}}>Submit</Text>
          </Button>
          
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
  statusBar: {
    backgroundColor: '#FFCE00',
    height: 20
  },
  header: {
    backgroundColor: '#FF9999',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    color: "#333",
    borderWidth: 1,
    borderColor: "#DDD",
    padding: 8,
    marginTop: 16
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase'
  },
  submitButton: {
    backgroundColor: colors.primary,
    marginTop: 24
  }
})