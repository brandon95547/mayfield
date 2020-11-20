import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native'
import MenuDrawer from 'react-native-side-drawer'
import { Button } from 'native-base'
import Header from '../Header'
import SideBar from '../SideBar'
import RaptorForm from '../forms/RaptorForm'
import * as Font from 'expo-font'
import { globals, componentStyles, colors, spacingStyles } from '../GlobalStyles'
import UserContext from '../../UserContext'

export default class StartScreen extends React.Component {
  constructor(props) {
    super(props)

    let foodItems = [
      {
        category: "HOT FOODS",
        icon: "burn",
        iconGroup: "FontAwesome5",
        items: [
          {
            title:"Corn Dog",
            price: 2
          },
          {
            title:"Hot Dog",
            price: 2.5
          },
          {
            title:"BBQ Sandwich",
            price: 5
          },
          {
            title:"Chicken Tenders",
            price: 4
          },
          {
            title:"Chicken Wings",
            price: 6
          },
          {
            title:"Pizza",
            price: 2,
            perSlice: true
          },
          {
            title:"Cheese Sticks",
            price: 4
          },
          {
            title:"Balagna Burger",
            price: 4
          },
          {
            title:"French Fries",
            description: "Add chili or cheese for .50 each",
            price: 4
          },
          {
            title:"Fried Pickles",
            price: 4
          },
          {
            title:"Hamburger/Cheeseburger",
            description: "Choice of lettuce, tomato, onions & pickles",
            price: 4.5
          },
          {
            title:"Onion Rings",
            price: 3
          },
        ]
      },
      {
        category: "SNACKS & CANDY",
        icon: "food-fork-drink",
        iconGroup: "MaterialCommunityIcons",
        items: [
          {
            title:"Slim Jim",
            price: .5
          },
          {
            title:"Special Character Combo Pack",
            description: "Popcorn, drink, sucker",
            price: 6
          },
          {
            title:"Blow Pop",
            price: .5
          },
          {
            title:"Pickled Egg or Sausage",
            price: 1
          },
          {
            title:"Cookies",
            description: "Chocolate chip, oatmeal raisin, peanut butter",
            price: 1
          },
          {
            title:"Airheads",
            price: .5
          },
          {
            title:"Cotton Candy",
            price: 3
          },
          {
            title:"Popcorn Large",
            price: 5
          },
          {
            title:"Nachos with Cheese",
            description: "Add chili or jalapenos for .50/each",
            price: 3.5
          },
          {
            title:"Pickle",
            price: 1
          },
          {
            title:"Donuts",
            description: "6 for $4.00, cinnamon sugar/powdered",
            price: 4
          },
          {
            title:"Funnel Cake Powdered/Cinnamon Sugar",
            description: "Add chocolate or stawberry $1.00 each",
            price: 4
          },
        ]
      },
      {
        category: "DRINKS",
        icon: "cup",
        iconGroup: "MaterialCommunityIcons",
        items: [
          {
            title:"Fountain Drinks",
            description: "Sundrop, Coke, Diet Coke, Sprite, Cherry Fanta, Dr. Pepper, Lemonade & Tea",
            price: .5
          },
          {
            title:"Small Drink",
            price: 1
          },
          {
            title:"Large Drink",
            price: 2
          },
          {
            title:"Hot Chocolate",
            price: 1
          },
          {
            title:"Coffee",
            price: 1
          },
          {
            title:"Bottled Water",
            price: 1
          },
          {
            title:"Small Ice",
            price: .25
          },
          {
            title:"Large Ice",
            price: .5
          },
          {
            title:"44 oz Souvenir Dip",
            price: 6,
            description: "Refills $4.00"
          },
          {
            title:"Small Slushie",
            price: 2
          },
          {
            title:"Large Slushie",
            price: 4
          },
        ]
      },
      {
        category: "ICE CREAM",
        icon: "ice-cream",
        iconGroup: "MaterialCommunityIcons",
        items: [
          {
            title:"Orange Push-ups",
            price: 2
          },
          {
            title:"Ice Cream Sandwich",
            price: 2
          },
          {
            title:"Drumsticks/Nutty Buddy",
            price: 2
          },
          {
            title:"Soft Serve Ice Cream Cone",
            price: 2,
            description: "Vanilla, chocolate or swirl"
          },
        ]
      },
      {
        category: "MISCELLANEOUS",
        icon: "puzzle-piece",
        iconGroup: "FontAwesome",
        items: [
          {
            title:"Rent Radio",
            description: "Valid drivers license required",
            price: 5
          },
          {
            title:"Buy Radio",
            price: 20
          },
          {
            title:"Tylenol",
            price: 1
          },
          {
            title:"Benadryl",
            price: 1
          },
          {
            title:"Advil",
            price: 1
          },
          {
            title:"Pepto Bismol",
            price: 1
          },
          {
            title:"Glo Stick",
            price: 1
          },
          {
            title:"LED Bracelet",
            price: 4
          },
          {
            title:"Flashlight",
            price: 2
          },
          {
            title:"Bug Repellent",
            price: 5
          },
          {
            title:"Hound's Shirt",
            price: 15
          },
          {
            title:"Hound's Hat",
            price: 15
          },
          {
            title:"Blanket",
            price: 10
          },
        ]
      },
    ]

    var hotFoodItems = [], 
    snackItems = [], 
    drinkItems = [], 
    icecreamItems = [], 
    miscItems = []

    let foodItemsData = []
    let indexOffset = 0
    foodItems.forEach((foodItem, itemIndex) => {
      if(itemIndex == 0) {
        indexOffset = 0
      }
      else {
        indexOffset += foodItem.items.length
      }
      foodItem.items.forEach((subItem, subIndex) => {
        let finalIndex = indexOffset+subIndex
        let flatLink = subItem.title.replace(/\s+/g, '-').toLowerCase()
        let splitVal = flatLink + ':' + finalIndex
        switch(foodItem.category) {
          case 'HOT FOODS' :
            hotFoodItems.push(
              [subItem.title, parseFloat(subItem.price).toFixed(2), finalIndex]
            )
          break
          case 'SNACKS & CANDY' :
            snackItems.push(
              [subItem.title, parseFloat(subItem.price).toFixed(2), finalIndex]
            )
          break
          case 'DRINKS' :
            drinkItems.push(
              [subItem.title, parseFloat(subItem.price).toFixed(2), finalIndex]
            )
          break
          case 'ICE CREAM' :
            icecreamItems.push(
              [subItem.title, parseFloat(subItem.price).toFixed(2), finalIndex]
            )
          break
          case 'MISCELLANEOUS' :
            miscItems.push(
              [subItem.title, parseFloat(subItem.price).toFixed(2), finalIndex]
            )
          break
        }
        foodItemsData[flatLink] = subItem
      })
    })

    this.state = {
      assetsLoaded: false,
      openForBusiness: false,
      open: false,
      foodItemMap: foodItemsData,
      foodCategories: ["HOT FOODS", "SNACKS & CANDY", "DRINKS", "ICE CREAM", "MISCELLANEOUS"],
      foodTableHead: ["Item", "Price", "Select"],
      hotFoodItems: hotFoodItems,
      snackItems: snackItems,
      drinkItems: drinkItems,
      icecreamItems: icecreamItems,
      miscItems: miscItems
    }

    this.toggleOpen = this.toggleOpen.bind(this)

  }

  static contextType = UserContext

  async componentDidMount() {
    const { isLoggedIn, setCartData, setCartTotal } = this.context
    isLoggedIn()
    this.isOpenForBusiness()
    
    // clear cart data on page load
    setCartData([])
    setCartTotal(0)
    setTimeout(() => {
      this.setState({ assetsLoaded: true });
    }, 2000);
  }

  isOpenForBusiness() {
    let _this = this
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText);
        console.log(response);
        if(response.openForBusiness == 1) {
          _this.setState({ openForBusiness: true });
        }
      }
    };

    var theUrl = "http://bluechipadvertising.com/openForBusiness.php?site_id=3";
    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({}));

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

    // let continueButtonPage = this.isLoggedIn() ? "StartPickup" : "Login"
    const {assetsLoaded, openForBusiness} = this.state

    if( assetsLoaded && openForBusiness ) {
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
                <Text style={styles.pageTitle}>DRIVE IN MENU</Text>
              </View>

              <RaptorForm tableHead={this.state.foodTableHead} tableItems={[this.state.hotFoodItems, this.state.snackItems, this.state.drinkItems, this.state.icecreamItems, this.state.miscItems]} foodCategories={this.state.foodCategories} />

              <View style={styles.buttonWrap}>
                <Button style={componentStyles.primaryButton} block onPress={() => this.props.navigation.navigate("Cart")}>
                    <Text style={{color: "white", fontWeight: "bold"}}>CHECKOUT</Text>
                </Button>
              </View>

            </ScrollView>

        </MenuDrawer>
      )
    }
    else if(!openForBusiness) {
      return(
        <>
        <Header navigation={this.props.navigation} leftButton="interior" toggleOpen={this.toggleOpen} />
        <View><Text style={{fontSize: 24, marginTop: 10}}>The store is not open at this time...</Text></View>
        </>
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
  buttonWrap: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 50
  },
  pageTitleWrap: {
    alignItems: "center"
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: "bold"
  },
  adjustGap: {
    marginTop: 0
  }
})