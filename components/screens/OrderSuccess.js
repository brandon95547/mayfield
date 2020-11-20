import React, { Component } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Icon, Button } from 'native-base';
import MenuDrawer from 'react-native-side-drawer'
import Header from '../Header';
import SideBar from '../SideBar';
import { globals, componentStyles, colors } from '../GlobalStyles';
import UserContext from '../../UserContext'

export default class OrderSuccess extends React.Component {
  constructor() {
    super();

    this.state = {
      assetsLoaded: false,
      open: false,
      items: [],
      total: 0,
      tax: 0,
      condimentsItems: []
    }

    this.toggleOpen = this.toggleOpen.bind(this);

  }

  static contextType = UserContext

  componentDidMount() {
    
    const { isLoggedIn, setCartData, setCartTotal } = this.context

    let _this = this
    const { orderID } = this.context
    var xmlhttp = new XMLHttpRequest() // new HttpRequest instance
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText)

        let foodItems = JSON.parse(response.order.food_order_items)
        foodItems = foodItems.items.filter(item => item !== null && item.quantity != 0)
        _this.setState({ items: foodItems })

        let total = 0
        let condimentsItems = []
        foodItems.forEach((subItem, subIndex) => {
          total += (subItem.price * parseInt(subItem.quantity))

          let condiments = []

          subItem.condiments.forEach((cItem, cIndex) => {
            condiments.push(cItem.substring(0, cItem.length - 2));
          });

          if(condiments.length > 0) {
            condiments.forEach((c1Item, cIndex) => {
              let cPrice = 0;
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
              if(cPrice != 0) {
                total += cPrice;
              }
              if(cPrice != 0) {
                condimentsItems.push({
                  title: c1Item,
                  price: cPrice
                })
              }
            })
            _this.setState({ condimentsItems: condimentsItems })
          }

        })

        let tax = Math.ceil((total * .0675) * 100)/100
        total = (1 + total)
        _this.setState({ total: total })
        _this.setState({ tax: tax })
        
        if(response.success) {
          setCartData([])
          setCartTotal(0)
          // set user state from context
          // setUser(JSON.parse(response.user))
          setTimeout(() => {
            // _this.props.navigation.navigate('Home')
          }, 1500)
        }
      }
    }

    var theUrl = "http://bluechipadvertising.com/retrieve_order.php?site_id=3"
    xmlhttp.open("POST", theUrl)
    xmlhttp.setRequestHeader("Content-Type", "application/jsoncharset=UTF-8")
    xmlhttp.send(JSON.stringify({ order_id: orderID }))

  }

  generateRandomString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 6);
  }

  drawerContent = () => {
    return (
      <TouchableOpacity style={componentStyles.animatedBox}>
        <SideBar navigation={this.props.navigation} toggleOpen={this.toggleOpen} />
      </TouchableOpacity>
    );
  };

  toggleOpen() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { checkoutCart, orderID, user } = this.context

    let theUser = user === null ? { name: "" } : user;

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
          
          <ScrollView style={styles.container}>
            <View>
              <Text style={styles.title}>IN-STORE PICKUP INSTRUCTIONS</Text>
            </View>
            <View style={styles.subHeading}>
              <View>
                <Text style={styles.textSmall}>Pickup</Text>
                <Text style={styles.textSmall}>Location</Text>
              </View>
              <View style={styles.stepDetailText}><Text style={styles.textSmall}>12100 State Rte 322,</Text>
              <Text style={styles.textSmall}>Chardon, OH 44024</Text></View>
            </View>
            <View style={styles.steps}>
              <View style={styles.step}>
                <Text>
                  <Text style={componentStyles.circle}> 1 </Text>
                </Text>
                <Text style={styles.text}> When your order is ready, you will receive an email. You can also see the order status from the menu.</Text>
              </View>
              <View style={styles.step}>
                <Text>
                  <Text style={componentStyles.circle}> 2 </Text>
                </Text>
                <Text style={styles.text}> Share your name and order number with the employee at the counter.</Text>
              </View>
              <View style={styles.step}>
                <Text>
                  <Text style={componentStyles.circle}> 3 </Text>
                </Text>
                <Text style={styles.text}> Enjoy!</Text>
              </View>
              </View>
              <View style={styles.subHeading2}>
                <View>
                  <Text style={styles.text}><Text style={styles.bold}>Order Name:</Text> {theUser.name}</Text>
                  <Text style={styles.text}><Text style={styles.bold}>Order Number:</Text> {orderID}</Text>
                </View>
              </View>
              <View style={{ marginTop: 16 }}>
                <Text style={styles.heading}>Order Details</Text>
              </View>
              {
                this.state.items.map((subItem, subIndex) => {
                  return (<View key={subIndex} style={styles.stepDetail}><Text style={{ fontSize: 15 }}>{subItem.title} (x{subItem.quantity})</Text><Text style={styles.stepDetailText}>${(subItem.price * subItem.quantity).toFixed(2)}</Text></View>)
                })
              }
              {
                this.state.condimentsItems.map((cItem, cIndex) => {
                  return (<View key={cIndex} style={styles.stepDetail}><Text style={{ fontSize: 15 }}>{cItem.title}</Text><Text style={styles.stepDetailText}>{cItem.price}</Text></View>)
                })
              }
              
              <View style={{ marginTop: 8 }}>
                <View style={styles.stepDetail}>
                  <Text style={{ fontSize: 15 }}>Convenience Fee</Text>
                  <Text style={styles.stepDetailText}>${1}</Text>
                </View>
                <View style={styles.stepDetail}>
                  <Text style={{ fontSize: 15 }}>Subtotal</Text>
                  <Text style={styles.stepDetailText}>${this.state.total - 1}</Text>
                </View>
              </View>
              <View style={styles.stepDetail}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Amount Paid</Text>
                <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: "auto" }}>${this.state.total.toFixed(2)}</Text>
              </View>
              <View style={styles.stepDetail}>
                <Text style={{ fontSize: 15 }}>Payment Method</Text>
                <Text style={styles.stepDetailText}>PayPal</Text>
              </View>
              <View style={styles.stepDetail}>
                <Text style={{ color: colors.money, fontWeight: "bold" }}>Order/Reference ID: {orderID}</Text>
              </View>
              <View style={{ marginTop: 30, marginBottom: 50 }}>
                <Button onPress={() => this.props.navigation.navigate("Home")} block style={componentStyles.primaryButton}>
                    <Text style={{color: "white", fontWeight: "bold"}}>DONE</Text>
                </Button>
              </View>
            </ScrollView>
      </MenuDrawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16
  },
  bold: {
    fontWeight: "bold"
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold"
  },
  text: {
    fontSize: 16
  },
  textSmall: {
    fontSize: 15,
    fontWeight: "bold"
  },
  title: {
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18
  },
  subHeading: {
    flexBasis: "auto",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#CCC",
    paddingTop: 8,
    paddingBottom: 8,
  },
  subHeading2: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#CCC",
    paddingTop: 8,
    paddingBottom: 8,
  },
  steps: {
    marginTop: 20
  },
  step: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 8
  },
  stepDetail: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 3,
    paddingBottom: 3
  },
  stepDetailText: {
    marginLeft: "auto",
  }
});