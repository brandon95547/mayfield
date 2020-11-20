import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Picker, Alert, ScrollView, ActivityIndicator } from 'react-native'
import { Icon, Button } from 'native-base'
import MenuDrawer from 'react-native-side-drawer'
import Header from '../Header'
import SideBar from '../SideBar'
import { globals, componentStyles, colors } from '../GlobalStyles'
import UserContext from '../../UserContext'
import * as Print from 'expo-print';

export default class EditOrderScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      assetsLoaded: false,
      open: false,
      itemID: 0,
      name: "",
      ready: 0,
      showUpdateButton: true,
      printHtml: ''
    }

    this.toggleOpen = this.toggleOpen.bind(this)

  }

  static contextType = UserContext

  componentDidMount() {
    const { orderToEdit } = this.context
    this.setState({ name: orderToEdit[0] })
    this.setState({ itemID: orderToEdit[1] })
    this.setState({ ready: orderToEdit[3] })
    this.generatePrintScreen()
  }

  generatePrintScreen() {

    const { orderToEdit } = this.context
    var _this = this

    let id = orderToEdit[1]
    let name = orderToEdit[0]

    var xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText)
        let printHtml = '<div><strong>Order ID</strong>: ' + id + '</div>'
        printHtml += '<div><strong>Name:</strong> ' + name + '<br><br></div>'

        response.items.forEach((subItem, subIndex) => {

          printHtml += '<div><strong>' + subItem.title + '</strong>, Quantity: ' + subItem.quantity + '</div>'

          let c1 = []
          let c2 = []
          let c3 = []

          subItem.condiments.forEach((cItem, cIndex) => {
            switch(cItem.substring(cItem.length - 1, cItem.length)) {
              case '0' :
                c1.push(cItem.substring(0, cItem.length - 2));
              break;
              case '1' :
                c2.push(cItem.substring(0, cItem.length - 2));
              break;
              case '2' :
                c3.push(cItem.substring(0, cItem.length - 2));
              break;
            }
          });

          let c1Markup = '';
          if(c1.length > 0) {
            c1.forEach((c1Item) => {
              c1Markup += c1Item + ',';
            })
            printHtml += '<div> &nbsp;&nbsp;&nbsp; #1' + '(' + c1Markup + ')</div>';
          }
          let c2Markup = '';
          if(c2.length > 0) {
            c2.forEach((c2Item) => {
              c2Markup += c2Item + ',';
            })
            printHtml += '<div> &nbsp;&nbsp;&nbsp; #2' + '(' + c2Markup + ')</div>';
          }
          let c3Markup = '';
          if(c3.length > 0) {
            c3.forEach((c3Item) => {
              c3Markup += c3Item + ',';
            })
            printHtml += '<div> &nbsp;&nbsp;&nbsp; #3' + '(' + c3Markup + ')</div>';
          }
        });

        printHtml += "<div><br><br><br></div>";

        _this.setState({ printHtml: printHtml })
        // console.log(printHtml);
        _this.setState({ assetsLoaded: true })

      }
    }

    var theUrl = "http://bluechipadvertising.com/getReceipt.php?site_id=3&id=" + id
    xmlhttp.open("POST", theUrl)
    xmlhttp.setRequestHeader("Content-Type", "application/jsoncharset=UTF-8")
    xmlhttp.send(JSON.stringify({ action: "get-items" }))
  }

  print = () => {
      Print.printAsync(
        {html: this.state.printHtml}
      )
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

  nameOnChange(name) {
    this.setState({ name: name })
  }

  dateOnChange(price) {
    this.setState({ price: price })
  }

  categoryOnChange(category) {
    this.setState({ category: category })
  }

  readyOnChange(value) {
    this.setState({ ready: value })
  }

  updateItem() {
    let _this = this
    let state = this.state
    _this.setState({ showUpdateButton: false });
    var xmlhttp = new XMLHttpRequest() // new HttpRequest instance
    xmlhttp.onreadystatechange = function () {
      console.log('status', this.status);
      if (this.readyState == 4 && this.status == 200) {
        _this.setState({ showUpdateButton: true });
        console.log('testing');
        let response = JSON.parse(this.responseText)
        if(response.success) {
          Alert.alert(
            'Alert',
            "Update successful",
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
        }
        else {
          Alert.alert(
            'Alert',
            "Update failed",
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
        }
      }
    }

    var theUrl = "http://bluechipadvertising.com/updateOrder.php?site_id=3"
    xmlhttp.open("POST", theUrl)
    xmlhttp.setRequestHeader("Content-Type", "application/jsoncharset=UTF-8")
    xmlhttp.send(JSON.stringify({ id: state.itemID, ready: state.ready }))
  }

  render() {

    const { assetsLoaded } = this.state

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
            <Header navigation={this.props.navigation} leftButton="interior" toggleOpen={this.toggleOpen} />
            
            <ScrollView style={{...componentStyles.paddingBox, ...colors.bgWhite}}>
            <View style={styles.pageTitleWrap}>
              <Text style={styles.pageTitle}>EDIT ORDER: </Text>
            </View>
            <View>
              <Button light onPress={() => this.print()} style={{marginTop: 16, paddingRight: 14}} iconLeft>
                <Icon style={{color: "#111"}} name='print' />
                <Text style={{ color: "#333" }}>Print Order</Text>
              </Button>
            </View>
            <TextInput style = {styles.textInput}
              underlineColorAndroid = "transparent"
              placeholder = "Name"
              placeholderTextColor = "#888"
              autoCapitalize = "none"
              value = {this.state.name}
              onChangeText = {name => this.nameOnChange(name)}
            />
            <Picker
                selectedValue={parseInt(this.state.ready)}
                style={ styles.picker }
                onValueChange={(itemValue, itemIndex) => this.readyOnChange(itemValue)}
              >
                <Picker.Item label="Yes" value={1} />
                <Picker.Item label="No" value={0} />
              </Picker>
            {this.state.showUpdateButton && 
            <Button onPress={() => this.updateItem()} block style={styles.submitButton}>
                <Text style={{color: "white", fontWeight: "bold"}}>UPDATE</Text>
            </Button>
            }
            {!this.state.showUpdateButton && 
            <ActivityIndicator size="large" color="#0000ff" />
            }

          </ScrollView>

        </MenuDrawer>
      )
    }
    else {
      return(
        <>
        <Header navigation={this.props.navigation} leftButton="interior" toggleOpen={this.toggleOpen} />
        <View><Text style={{fontSize: 24, marginTop: 10}}>Loading...</Text></View>
        </>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  picker: {
    color: "#333",
    borderWidth: 1,
    borderColor: "#DDD",
    padding: 8,
    marginTop: 16,
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