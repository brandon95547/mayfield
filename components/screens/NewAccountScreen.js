import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, TextInput, AsyncStorage, Alert } from 'react-native';
import MenuDrawer from 'react-native-side-drawer'
import { Button } from 'native-base';
// custom components
import Header from '../Header';
import SideBar from '../SideBar';
import ReactDOM from "react-dom";
import { globals, componentStyles, colors, spacingStyles } from '../GlobalStyles';
import UserContext from '../../UserContext'

export default class NewAccount extends React.Component {
  constructor() {
    super();

    this.state = {
      open: false,
      email: "",
      name: "",
      password: "",
      phone: ""
    }

    this.toggleOpen = this.toggleOpen.bind(this);
    
  }

  componentDidMount() {
  }

  static contextType = UserContext

  drawerContent = () => {
    return (
      <TouchableOpacity onPress={this.toggleOpen} style={componentStyles.animatedBox}>
        <SideBar navigation={this.props.navigation} toggleOpen={this.toggleOpen} />
      </TouchableOpacity>
    );
  };

  toggleOpen() {
    this.setState({ open: !this.state.open });
  }

  emailOnChange(email) {
    this.setState({ email: email })
  }

  nameOnChange(name) {
    this.setState({ name: name })
  }

  phoneOnChange(phone) {
    this.setState({ phone: phone })
  }

  passwordOnChange(password) {
    this.setState({ password: password })
  }

  _storeData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      // Error saving data
    }
  };

  processAccountCreation() {
    let _this = this
    const { user, setUser, token } = this.context
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

    if(this.state.name === "") {
      Alert.alert(
        'Alert',
        "Invalid name",
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

    if(this.state.password === "") {
      Alert.alert(
        'Alert',
        "Invalid password",
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

    var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText);
        
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
    };

    var theUrl = "http://bluechipadvertising.com/signup.php?site_id=3";
    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({name: this.state.name, email: this.state.email, password: this.state.password, createAccount: 1, phone: this.state.phone}));

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
            <Text style={styles.pageTitle}>New Account</Text>
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
            placeholder = "Enter Name"
            placeholderTextColor = "#888"
            autoCapitalize = "none"
            onChangeText = {name => this.nameOnChange(name)}
          />
          <TextInput style = {styles.textInput}
            underlineColorAndroid = "transparent"
            placeholder = "Enter Phone"
            placeholderTextColor = "#888"
            autoCapitalize = "none"
            onChangeText = {phone => this.phoneOnChange(phone)}
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
              <Text style={{color: "white", fontWeight: "bold"}}>CREATE NEW ACCOUNT</Text>
          </Button>

        </ScrollView>

        </MenuDrawer>
    );
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
});