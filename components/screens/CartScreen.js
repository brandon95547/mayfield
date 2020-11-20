import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, Alert, ScrollView } from 'react-native'
import { Icon, Button } from 'native-base'
import MenuDrawer from 'react-native-side-drawer'
import Header from '../Header'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'
import SideBar from '../SideBar'
import { WebView } from 'react-native-webview';
import { globals, componentStyles, colors } from '../GlobalStyles'

import UserContext from '../../UserContext'

export default class CartScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      assetsLoaded: false,
      didRender: false,
      open: false,
      showModal: false,
      create_payment_json: {
        payer: {
            payment_method: "paypal"
        },
        redirect_urls: {
            return_url: "http://18.191.104.234:3002/success",
            cancel_url: "http://18.191.104.234:3002/cancel"
        }
      },
      stagingEndpoint: 'http://fbbf3b9ddad1.ngrok.io',
      productionEndpoint: 'http://18.191.104.234:3002'
    }
    
    this.toggleOpen = this.toggleOpen.bind(this)
    
  }
  
  static contextType = UserContext
  
  async componentDidMount() {
    const { user, cartTotal, setUser, isLoggedIn } = this.context
    isLoggedIn()
    
    this.setState({ assetsLoaded: true })
    this.getCartItems()
  }
  
  navigateTo = () => {
    const { cartData, setCartData } = this.context
    return cartData.length > 0 ? (<Button style={styles.primaryButton} block onPress={() => this.setState({ showModal: true })}><Text style={{color: "white", fontWeight: "bold"}}>PROCEED TO CHECKOUT</Text></Button>) : (<Button style={styles.primaryButton} block onPress={() => this.props.navigation.navigate("StartPickup")}><Text style={{color: "white", fontWeight: "bold"}}>START PICKUP ORDER</Text></Button>)
  }
  
  handleResponse = data => {
    if(data.title == 'success') {

      var query = data.url.split("?")[1];
      var params = query.split("&");

      let paymentId = '';
      let token = '';
      let PayerID = '';

      for (var i=0; i < params.length; i++) {
          switch(params[i].split("=")[0]) {
            case 'paymentId' :
            paymentId = params[i].split("=")[1];
            break;
            
            case 'token' :
            token = params[i].split("=")[1];
            break;
            
            case 'PayerID' :
            PayerID = params[i].split("=")[1];
            break;
            
          }
      }

      this.trackOrder(token, paymentId, PayerID);

      this.setState({ showModal: false, status: "Complete" });
      Alert.alert(
        'Alert',
        "Order successful, please wait...",
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
    else if(data.title === 'cancel') {
      this.setState({ showModal: false });
    }
    else {
      return;
    }
  }

  trackOrder(token, paymentId, PayerID) {
    const { setOrderId, cartData, user } = this.context
    let total = 0
    const foodItems = cartData.filter(item => item !== null)
    foodItems.forEach((subItem, subIndex) => {
      if(parseInt(subItem.quantity) != 0) {
        total += (subItem.price * parseInt(subItem.quantity))
      }
    })
    let cartSummary = {
      items: foodItems,
      amt: 1 + total.toFixed(2),
      method: "VISA",
    }
    cartSummary = JSON.stringify(cartSummary);

    let _this = this
    var xmlhttp = new XMLHttpRequest() // new HttpRequest instance
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText)
        
        // _this.refs.childToast.showToast(response.success ? colors.green : colors.failure, response.message)
        if(response.success) {
          setOrderId(response.order_id)
          setTimeout(() => {
            _this.props.navigation.navigate('OrderSuccess')
          }, 1500)
        }
      }
    }

    var theUrl = "http://bluechipadvertising.com/trackOrder.php?site_id=3"
    xmlhttp.open("POST", theUrl)
    xmlhttp.setRequestHeader("Content-Type", "application/jsoncharset=UTF-8")
    xmlhttp.send(JSON.stringify({ user_id: user.user_id, token: token, paymentId: paymentId, PayerID: PayerID, cartSummary: cartSummary }))

  }
  
  getCartItems = () => {
    const { cartData, setCartData } = this.context

    const foodItems = cartData.filter(item => item !== null)
    let items = []
    let total = 0
    const paypalItems = [];

    foodItems.forEach((subItem, subIndex) => {

      if(parseInt(subItem.quantity) != 0) {
        paypalItems.push(
          {
            name: subItem.title,
            sku: subItem.title.replace(/\s+/g, '-').toLowerCase(),
            price: parseFloat(subItem.price).toFixed(2),
            currency: "USD",
            quantity: parseInt(subItem.quantity)
          }
        )
        total += (subItem.price * parseInt(subItem.quantity))
        items.push([subItem.title, '$' + parseFloat(subItem.price).toFixed(2), parseInt(subItem.quantity)])
        
        // tally up condiments
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
        if(c1.length > 0 && parseInt(subItem.quantity) >= 1) {
          if(subItem.quantity > 1) {
            items.push([<Text style={styles.condimentText}>#1</Text>, '', ''])
          }
          c1.forEach((c1Item) => {
            let cPrice = '';
            if(c1Item == 'chili' || c1Item == 'cheese' || c1Item == 'jalapenos') {
              cPrice = 1;
            }
            if(c1Item == 'chocolateSyrup' || c1Item == 'strawberrySyrup') {
              cPrice = 1;
            }
            if(subItem.title == 'Small Pizza' || subItem.title == 'Large Pizza') {
              if(c1Item == 'pepperoni' || c1Item == 'sausage' || c1Item == 'onions' || c1Item == 'jalapenos' || c1Item == 'cheese') {
                cPrice = 1;
              }
            }
            if(cPrice !== '') {
              total += cPrice;
              paypalItems.push(
                {
                  name: c1Item,
                  sku: c1Item.replace(/\s+/g, '-').toLowerCase(),
                  price: cPrice,
                  currency: "USD",
                  quantity: 1
                }
              )
            }
            items.push([<Text style={styles.condimentText}>    {c1Item}</Text>, <Text style={styles.condimentText}>{cPrice}</Text>, '-'])
          })
        }
        if(c2.length > 0 && parseInt(subItem.quantity) >= 2) {
          items.push([<Text style={styles.condimentText}>#2</Text>, '', ''])
          c2.forEach((c1Item) => {
            let cPrice = '';
            if(c1Item == 'chili' || c1Item == 'cheese' || c1Item == 'jalapenos') {
              cPrice = 1;
            }
            if(c1Item == 'chocolateSyrup' || c1Item == 'strawberrySyrup') {
              cPrice = 1;
            }
            if(subItem.title == 'Small Pizza' || subItem.title == 'Large Pizza') {
              if(c1Item == 'pepperoni' || c1Item == 'sausage' || c1Item == 'onions' || c1Item == 'jalapenos' || c1Item == 'cheese') {
                cPrice = 1;
              }
            }
            if(cPrice !== '') {
              total += cPrice;
              paypalItems.push(
                {
                  name: c1Item,
                  sku: c1Item.replace(/\s+/g, '-').toLowerCase(),
                  price: cPrice,
                  currency: "USD",
                  quantity: 1
                }
              )
            }
            items.push([<Text style={styles.condimentText}>    {c1Item}</Text>, <Text style={styles.condimentText}>{cPrice}</Text>, '-'])
          })
        }
        if(c3.length > 0 && parseInt(subItem.quantity) >= 3) {
          items.push([<Text style={styles.condimentText}>#3</Text>, '', ''])
          c3.forEach((c1Item) => {
            let cPrice = '';
            if(c1Item == 'chili' || c1Item == 'cheese' || c1Item == 'jalapenos') {
              cPrice = 1;
            }
            if(c1Item == 'chocolateSyrup' || c1Item == 'strawberrySyrup') {
              cPrice = 1;
            }
            if(subItem.title == 'Small Pizza' || subItem.title == 'Large Pizza') {
              if(c1Item == 'pepperoni' || c1Item == 'sausage' || c1Item == 'onions' || c1Item == 'jalapenos' || c1Item == 'cheese') {
                cPrice = 1;
              }
            }
            if(cPrice !== '') {
              total += cPrice;
              paypalItems.push(
                {
                  name: c1Item,
                  sku: c1Item.replace(/\s+/g, '-').toLowerCase(),
                  price: cPrice,
                  currency: "USD",
                  quantity: 1
                }
              )
            }
            items.push([<Text style={styles.condimentText}>    {c1Item}</Text>, <Text style={styles.condimentText}>{cPrice}</Text>, '-'])
          })
        }
      }
    });

    paypalItems.push(
      {
        name: "Convenience Fee",
        sku: "convenience-fee",
        price: 1,
        currency: "USD",
        quantity: 1
      }
    )

    /* paypalItems.push(
      {
        name: "OH Taxes",
        sku: "oh-taxes",
        price: Math.ceil((total * .0675) * 100)/100,
        currency: "USD",
        quantity: 1
      }
    ) */

    let taxRate = .0675;
    let tax = total * taxRate;
    tax = Math.ceil(tax * 100) / 100;
    
    this.state.create_payment_json.transactions = [
        {
            item_list: {
                items: paypalItems
            },
            amount: {
                currency: "USD",
                total: (total + 1).toFixed(2)
            },
            description: "Mayfield Drive-In purchase."
        }
    ]

    const cartTable = items.length > 0 ? <><Table>
    <Row data={["Item", "Price", "Quantity"]} style={styles.tableHeading} textStyle={styles.rowTextStyle}/>
      {
        items.map((rowData, rowIndex) => (
          <TableWrapper key={rowIndex} style={styles.tableWrapper}>
            {
              rowData.map((cellData, cellIndex) => (
                <Cell key={cellIndex} data={cellData} textStyle={styles.rowTextStyle}/>
              ))
            }
          </TableWrapper>
        ))
      }
    </Table><View style={{alignItems: "flex-end"}}><Text style={styles.fee}>Convenience Fee: $1.00</Text>
    <Text style={{...componentStyles.money, ...componentStyles.textNode}}>Total: ${(total + 1).toFixed(2)}</Text></View></> : <View><Text style={{ fontSize: 16 }}>Nothing has been added to the cart.</Text></View>

    return (cartTable)
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
        <Modal visible={this.state.showModal} inRequestClose={() => this.setState({ showModal: false })}>
          <WebView source={{ uri: this.state.productionEndpoint }} onNavigationStateChange={data => this.handleResponse(data)} mixedContentMode={'compatibility'} injectedJavaScript={"document.getElementById('pricingData').value='" + JSON.stringify(this.state.create_payment_json) + "'; submitForm();"} javaScriptEnabled={true} onMessage={() => {}} />
        </Modal>

          <Header navigation={this.props.navigation} leftButton="interior" toggleOpen={this.toggleOpen} />
          
          <ScrollView style={styles.container}>
            <View style={styles.pageTitleWrap}>
              <Text style={styles.pageTitle}>Review Order</Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")}> 
                <Text style={{ color: 'red' }}>Start Over</Text>
              </TouchableOpacity>
              
            </View>

            {this.getCartItems()}
            {this.navigateTo()}
            
          </ScrollView>
          

      </MenuDrawer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  fee: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16
  },
  condimentText: {
    color: '#377760'
  },
  rowTextStyle: {
    fontSize: 16
  },
  tableWrapper: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 18
  },
  tableHeading: {
    backgroundColor: "#EEE",
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 18,
    marginBottom: 6
  }, 
  pageTitleWrap: {
    marginBottom: 24,
    display: 'flex',
    flexDirection: 'row'
  },
  pageTitle: {
    fontSize: 17,
    fontWeight: "bold",
    flex: 1
  },
  adjustGap: {
    marginTop: 0
  },
  primaryButton: {
    backgroundColor: colors.primary,
    width: "75%",
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 60
  },
})