import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Picker, Alert, ScrollView } from 'react-native'
import { Icon, Button } from 'native-base'
import MenuDrawer from 'react-native-side-drawer'
import Header from '../Header'
import SideBar from '../SideBar'
import { globals, componentStyles, colors } from '../GlobalStyles'
import UserContext from '../../UserContext'

export default class EditFoodScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      assetsLoaded: false,
      open: false,
      itemID: 0,
      title: "",
      price: "",
      category: "",
      isAvailable: 1
    }

    this.toggleOpen = this.toggleOpen.bind(this)

  }

  static contextType = UserContext

  componentDidMount() {
    const { itemToEdit } = this.context
    this.setState({ title: itemToEdit[0] })
    this.setState({ price: itemToEdit[1] })
    this.setState({ category: itemToEdit[2] })
    this.setState({ itemID: itemToEdit[3] })
    this.setState({ isAvailable: itemToEdit[4] })
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

  titleOnChange(title) {
    this.setState({ title: title })
  }

  priceOnChange(price) {
    this.setState({ price: price })
  }

  categoryOnChange(category) {
    this.setState({ category: category })
  }

  availableOnChange(value) {
    this.setState({ isAvailable: value })
  }

  getFoodItems() {
    const { setAdminFoodItems } = this.context
    var xmlhttp = new XMLHttpRequest() // new HttpRequest instance
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText)
        setAdminFoodItems(response)
        
      }
    }

    var theUrl = "http://bluechipadvertising.com/getFoodItems.php?site_id=3"
    xmlhttp.open("POST", theUrl)
    xmlhttp.setRequestHeader("Content-Type", "application/jsoncharset=UTF-8")
    xmlhttp.send(JSON.stringify({ action: "get-items" }))
  }

  updateItem() {
    let _this = this
    let state = this.state
    var xmlhttp = new XMLHttpRequest() // new HttpRequest instance
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText)

        
        if(response.success) {
          _this.getFoodItems()
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

    var theUrl = "http://bluechipadvertising.com/updateItem.php?site_id=3"
    xmlhttp.open("POST", theUrl)
    xmlhttp.setRequestHeader("Content-Type", "application/jsoncharset=UTF-8")
    xmlhttp.send(JSON.stringify({ id: state.itemID, title: state.title, price: state.price, category: state.category, isAvailable: state.isAvailable }))
  }

  render() {

    const { itemToEdit } = this.context

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
            <Text style={styles.pageTitle}>EDIT ITEM: </Text>
          </View>
          <TextInput style = {styles.textInput}
            underlineColorAndroid = "transparent"
            placeholder = "Title"
            placeholderTextColor = "#888"
            autoCapitalize = "none"
            value = {this.state.title}
            onChangeText = {title => this.titleOnChange(title)}
          />
          <TextInput style = {styles.textInput}
            underlineColorAndroid = "transparent"
            placeholder = "Price"
            placeholderTextColor = "#888"
            autoCapitalize = "none"
            value = {this.state.price}
            onChangeText = {price => this.priceOnChange(price)}
          />
          <TextInput style = {styles.textInput}
            underlineColorAndroid = "transparent"
            placeholder = "Category"
            placeholderTextColor = "#888"
            autoCapitalize = "none"
            value = {this.state.category}
            onChangeText = {category => this.categoryOnChange(category)}
          />
          <Picker
              selectedValue={parseInt(this.state.isAvailable)}
              style={ styles.picker }
              onValueChange={(itemValue, itemIndex) => this.availableOnChange(itemValue)}
            >
              <Picker.Item label="Yes" value={1} />
              <Picker.Item label="No" value={0} />
            </Picker>
          <Button onPress={() => this.updateItem()} block style={styles.submitButton}>
              <Text style={{color: "white", fontWeight: "bold"}}>UPDATE</Text>
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