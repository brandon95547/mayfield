import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, TextInput, Alert } from 'react-native'
import MenuDrawer from 'react-native-side-drawer'
import { Button } from 'native-base'
// custom components
import Header from '../Header'
import SideBar from '../SideBar'
import { globals, componentStyles, colors, spacingStyles } from '../GlobalStyles'
import UserContext from '../../UserContext'

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      email: "",
      password: "",
      phone: ""
    }

    this.toggleOpen = this.toggleOpen.bind(this)
    
  }

  static contextType = UserContext

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

  emailOnChange(email) {
    this.setState({ email: email })
  }

  phoneOnChange(phone) {
    this.setState({ phone: phone })
  }

  passwordOnChange(password) {
    this.setState({ password: password })
  }

  processAccountCreation() {
    let _this = this
    const { user, setUser, token } = this.context
    if(!this.emailIsValid(this.state.email)) {
      Alert.alert(
        'Alert',
        'Email invalid',
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

    var xmlhttp = new XMLHttpRequest() // new HttpRequest instance
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
          let tempUser = JSON.parse(response.user);
          tempUser.token = token
          setUser(tempUser)
          _this.updateUserToken(tempUser);
          setTimeout(() => {
            _this.props.navigation.navigate('Home')
          }, 1500)
        }
      }
    }

    var theUrl = "http://bluechipadvertising.com/signup.php?site_id=3"
    xmlhttp.open("POST", theUrl)
    xmlhttp.setRequestHeader("Content-Type", "application/jsoncharset=UTF-8")
    xmlhttp.send(JSON.stringify({email: this.state.email, password: this.state.password, createAccount: 0, phone: this.state.phone}))

  }

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
          overlay={true}
          opacity={0.4}
        >   

       

        <Header navigation={this.props.navigation} leftButton="interior" toggleOpen={this.toggleOpen} />
        

        <ScrollView style={{...componentStyles.paddingBox, ...colors.bgWhite}}>
          <View style={styles.pageTitleWrap}>
            
            <Text style={styles.pageTitle}>Login</Text>
          </View>
          <TextInput style = {styles.textInput}
            underlineColorAndroid = "transparent"
            placeholder = "Enter Email"
            placeholderTextColor = "#888"
            autoCapitalize = "none"
            onChangeText = {email => this.emailOnChange(email)}
          />
          <TextInput style = {styles.textInput}
            underlineColorAndroid = "transparent"
            placeholder = "Password"
            placeholderTextColor = "#888"
            autoCapitalize = "none"
            secureTextEntry = {true}
            onChangeText = {password => this.passwordOnChange(password)}
          />
          <Button onPress={() => this.processAccountCreation()} block style={styles.submitButton}>
              <Text style={{color: "white", fontWeight: "bold"}}>LOGIN</Text>
          </Button>

          <View style={{alignItems: "center"}}>
            <Button onPress={() => {this.props.navigation.navigate('ForgotPassword')}} transparent>
                <Text style={{color: colors.secondary, fontWeight: "bold"}}>Forgot Password</Text>
            </Button>
          </View>

        </ScrollView>

        </MenuDrawer>
    )
    // <Text>{this.state.todoInput}</Text> inside <View>
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