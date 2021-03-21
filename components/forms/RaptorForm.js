import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, Text, TouchableHighlight, Modal, Alert, Switch } from 'react-native'
import { CustomPicker } from 'react-native-custom-picker'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'
import { colors } from '../GlobalStyles'
import UserContext from '../../UserContext' 

export default class RaptorForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: {},
      cart: [],
      modalVisible: false,
      foodOptions: '',
      lettuceChecked: [],
      tomatoChecked: [],
      picklesChecked: [],
      onionChecked: [],
      chiliChecked: [],
      slawChecked: [],
      cheeseChecked: [],
      jalapenosChecked: [],
      ketchupChecked: [],
      mustardChecked: [],
      ranchChecked: [],
      relishChecked: [],
      dillPickleChecked: [],
      honeyMustardChecked: [],
      butterChecked: [],
      bbqChecked: [],
      mayoChecked: [],
      powderedChecked: [],
      cinnamonSugarChecked: [],
      chocolateSyrupChecked: [],
      strawberrySyrupChecked: [],
      lemonChecked: [],
      chocolateChipChecked: [],
      oatmealRaisinChecked: [],
      peanutButterChecked: [],
      // pizza toppings
      pepperoniChecked: [],
      sausageChecked: [],
      // coffee
      sugarChecked: [],
      creamerChecked: [],
      splendaChecked: [],
      // ice cream flavors
      vanillaChecked: [],
      chocolateChecked: [],
      greenMintChocolateChipChecked: [],
      // drinks
      cokeChecked: [],
      pepsiChecked: [],
      dietPepsiChecked: [],
      sierraMistChecked: [],
      mugRootBeerChecked: [],
      mtnDewChecked: [],
      orangeCrushChecked: [],
      siberianChillStrawberryKiwiChecked: [],
      liptonSweetTeaChecked: [],
      liptonUnsweetenedTeaChecked: [],
      cokeZeroChecked: [],
      spriteChecked: [],
      sundropChecked: [],
      cherryLemonSundropChecked: [],
      cherryFantaChecked: [],
      drPepperChecked: [],
      goldPeakTeaChecked: [],
      countryTimeLemonadeChecked: [],
      itemToUpdate: 0,
      itemToUpdateTitle: '',
      itemToUpdateQuantity: 0
    }

    this.updateFoodItemQuantity = this.updateFoodItemQuantity.bind(this)
  }

  static contextType = UserContext

  setModalVisible(value) {
    this.setState({ modalVisible: value })
  }

  componentDidMount() {
    this.getFoodItems()
  }

  updateFoodItemQuantity(index, key, price, title, quantity) { // food_id, food_id, food_price, food_title, quantity

    var _this = this;
    const { isLoggedIn, setCartData, setCartTotal, cartData } = this.context
    var currentChecked = this.state.checked
    currentChecked[key] = quantity
    this.setState({ checked: currentChecked })
    
    let cartItems = cartData

    this.setState({ itemToUpdate: index })
    this.setState({ itemToUpdateTitle: title })
    this.setState({ itemToUpdateQuantity: quantity })

    let itemsThatNeedOptions = [
      "Hamburger",
      "Cheeseburger",
      "Double Cheeseburger",
      "Spicy Chicken Sandwich",
      "Hotdog",
      "Corndog",
      "Chicken Tenders",
      "Regular Popcorn",
      "Large Popcorn",
      "Tub Popcorn",
      "Bucket Popcorn",
      "Small Drink",
      "Large Drink",
      "Small Pizza",
      "Large Pizza",
      "Ice Cream Cone",
      "Dish Ice Cream",
      "Milkshake",
      "French Fries",
      "Soft Pretzel",
      "Coffee",
      "Minute Maid Frozen Lemonade"
    ]

    if(quantity === null) {
      quantity = 0
    }

    if(itemsThatNeedOptions.includes(title) && quantity != 0) {
      this.setModalVisible(true)
    }

    let cart = {
      key: key,
      price: price,
      title: title,
      quantity: quantity,
      condiments: []
    }

    if(typeof cartItems[index] === "undefined") {
      cartItems[index] = cart;
    }
    else {
      cartItems[index].key = key;
      cartItems[index].price = price;
      cartItems[index].title = title;
      cartItems[index].quantity = quantity;
      if(quantity == 0) {
        cartItems[index].condiments = [];
        _this.emptyCondimentsByIndex(index);
      }
    }
    
    setCartData(cartItems)
	}

  getFoodItems() {
    const { setPublicFoodItems } = this.context
    var xmlhttp = new XMLHttpRequest() // new HttpRequest instance
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText)
        setPublicFoodItems(response)
        
      }
    }

    var theUrl = "http://bluechipadvertising.com/getFoodItemsPublic.php?site_id=3"
    xmlhttp.open("POST", theUrl)
    xmlhttp.setRequestHeader("Content-Type", "application/jsoncharset=UTF-8")
    xmlhttp.send(JSON.stringify({ action: "get-items" }))
  }

  emptyCondimentsByIndex(index) {
      // lettuce
      var current = this.state.lettuceChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ lettuceChecked: current })

      // tomato
      var current = this.state.tomatoChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ tomatoChecked: current })
      
      // pickles
      var current = this.state.picklesChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ picklesChecked: current })

      // onion
      var current = this.state.onionChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ onionChecked: current })

      // chili
      var current = this.state.chiliChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ chiliChecked: current })

      // slaw
      var current = this.state.slawChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ slawChecked: current })
      
      // cheese
      var current = this.state.cheeseChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ cheeseChecked: current })
      
      // jalapenos
      var current = this.state.jalapenosChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ jalapenosChecked: current })
      
      // ketchup
      var current = this.state.ketchupChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ ketchupChecked: current })
      
      // mustard
      var current = this.state.mustardChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ mustardChecked: current })
      
      // ranch
      var current = this.state.ranchChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ ranchChecked: current })

      // relish
      var current = this.state.relishChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ relishChecked: current })
      
      // dillpickles
      var current = this.state.dillPickleChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ dillPickleChecked: current })
      
      // honey mustard
      var current = this.state.honeyMustardChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ honeyMustardChecked: current })
      
      // butter
      var current = this.state.butterChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ butterChecked: current })
      
      // BBQ
      var current = this.state.bbqChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ bbqChecked: current })
      
      // mayo
      var current = this.state.mayoChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ mayoChecked: current })
      
      // powdered sugar
      var current = this.state.powderedChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ powderedChecked: current })
      
      // cinnamon sugar
      var current = this.state.cinnamonSugarChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ cinnamonSugarChecked: current })
      
      // chocolate syrup
      var current = this.state.chocolateSyrupChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ chocolateSyrupChecked: current })
      
      // strawberry syrup
      var current = this.state.strawberrySyrupChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ strawberrySyrupChecked: current })
      
      // lemon
      var current = this.state.lemonChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ lemonChecked: current })
      
      // chocolate chip
      var current = this.state.chocolateChipChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ chocolateChipChecked: current })
      
      // oatmeal raisin
      var current = this.state.oatmealRaisinChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ oatmealRaisinChecked: current })
      
      // peanut butter
      var current = this.state.peanutButterChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ peanutButterChecked: current })
      
      // pepperoni
      var current = this.state.pepperoniChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ pepperoniChecked: current })
      
      // sausage
      var current = this.state.sausageChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ sausageChecked: current })
      
      // vanilla
      var current = this.state.vanillaChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ vanillaChecked: current })
      
      // chocolate
      var current = this.state.chocolateChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ chocolateChecked: current })
      
      // green mint chocolate chip
      var current = this.state.greenMintChocolateChipChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ greenMintChocolateChipChecked: current })
      
      // coke
      var current = this.state.cokeChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ cokeChecked: current })

      // pepsi
      var current = this.state.pepsiChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ pepsiChecked: current })

      // diet pepsi
      var current = this.state.dietPepsiChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ dietPepsiChecked: current })

      // sierra mist
      var current = this.state.sierraMistChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ sierraMistChecked: current })

      // mug root beer
      var current = this.state.mugRootBeerChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ mugRootBeerChecked: current })

      // mtn dew
      var current = this.state.mtnDewChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ mtnDewChecked: current })

      // orange crush
      var current = this.state.orangeCrushChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ orangeCrushChecked: current })

      // siberian chill strawberry kiwi
      var current = this.state.siberianChillStrawberryKiwiChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ siberianChillStrawberryKiwiChecked: current })

      // lipton sweet tea
      var current = this.state.liptonSweetTeaChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ liptonSweetTeaChecked: current })

      // lipton unsweetened tea
      var current = this.state.liptonUnsweetenedTeaChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ liptonUnsweetenedTeaChecked: current })
      
      // coke zero
      var current = this.state.cokeZeroChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ cokeZeroChecked: current })
      
      // sprite
      var current = this.state.spriteChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ spriteChecked: current })
      
      // sun drop
      var current = this.state.sundropChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ sundropChecked: current })
      
      // cherry lemon sun drop
      var current = this.state.cherryLemonSundropChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ cherryLemonSundropChecked: current })
      
      // cherry fanta
      var current = this.state.cherryFantaChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ cherryFantaChecked: current })
      
      // dr pepper
      var current = this.state.drPepperChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ drPepperChecked: current })
      
      // Rasberry Brisk Tea
      var current = this.state.goldPeakTeaChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ goldPeakTeaChecked: current })
      
      // Hi -C Pink lemonade
      var current = this.state.countryTimeLemonadeChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ countryTimeLemonadeChecked: current })
      
      // sugar
      var current = this.state.sugarChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ sugarChecked: current })
      
      // creamer
      var current = this.state.creamerChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ creamerChecked: current })
      
      // splenda
      var current = this.state.splendaChecked;
      current[index+0] = false;
      current[index+1] = false;
      current[index+2] = false;
      this.setState({ splendaChecked: current })
      
  }

  /*
  The purpose of this method is to add condiments for food items when adding items to a cart
  */
  updateFoodItem(item, which) {
    const { isLoggedIn, setCartData, setCartTotal, cartData } = this.context
    var prevCart = cartData[this.state.itemToUpdate]
    var originalItem = item;
    item = item + '-' + which;

    // check if the item is already added to the cart
    var index = prevCart.condiments.indexOf(item)
    var itemIndex = this.state.itemToUpdate;

    switch(originalItem) {
      case 'lettuce' :
        var current = this.state.lettuceChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ lettuceChecked: current })
      break
      case 'tomato' :
        var current = this.state.tomatoChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ tomatoChecked: current })
      break
      case 'pickles' :
        var current = this.state.picklesChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ picklesChecked: current })
      break
      case 'onions' :
        var current = this.state.onionChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ onionChecked: current })
      break
      case 'chili' :
        var current = this.state.chiliChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ chiliChecked: current })
      break
      case 'slaw' :
        var current = this.state.slawChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ slawChecked: current })
      break
      case 'cheese' :
        var current = this.state.cheeseChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ cheeseChecked: current })
      break
      case 'jalapenos' :
        var current = this.state.jalapenosChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ jalapenosChecked: current })
      break
      case 'ketchup' :
        var current = this.state.ketchupChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ ketchupChecked: current })
      break
      case 'mustard' :
        var current = this.state.mustardChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ mustardChecked: current })
      break
      case 'ranch' :
        var current = this.state.ranchChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ ranchChecked: current })
      break
      case 'relish' :
        var current = this.state.relishChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ relishChecked: current })
      break
      case 'dillpickles' :
        var current = this.state.dillPickleChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ dillPickleChecked: current })
      break
      case 'honeymustard' :
        var current = this.state.honeyMustardChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ honeyMustardChecked: current })
      break
      case 'bbq' :
        var current = this.state.bbqChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ bbqChecked: current })
      break
      case 'butter' :
        var current = this.state.butterChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ butterChecked: current })
      break
      case 'coke' :
        var current = this.state.cokeChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ cokeChecked: current })
      break
      case 'pepsi' :
        var current = this.state.pepsiChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ pepsiChecked: current })
      break
      case 'dietPepsi' :
        var current = this.state.dietPepsiChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ dietPepsiChecked: current })
      break
      case 'sierraMist' :
        var current = this.state.sierraMistChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ sierraMistChecked: current })
      break
      case 'mugRootBeer' :
        var current = this.state.mugRootBeerChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ mugRootBeerChecked: current })
      break
      case 'mtnDew' :
        var current = this.state.mtnDewChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ mtnDewChecked: current })
      break
      case 'orangeCrush' :
        var current = this.state.orangeCrushChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ orangeCrushChecked: current })
      break
      case 'siberianChillStrawberryKiwi' :
        var current = this.state.siberianChillStrawberryKiwiChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ siberianChillStrawberryKiwiChecked: current })
      break
      case 'liptonSweetTea' :
        var current = this.state.liptonSweetTeaChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ liptonSweetTeaChecked: current })
      break
      case 'liptonUnsweetenedTea' :
        var current = this.state.liptonUnsweetenedTeaChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ liptonUnsweetenedTeaChecked: current })
      break
      case 'cokeZero' :
        var current = this.state.cokeZeroChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ cokeZeroChecked: current })
      break
      case 'sprite' :
        var current = this.state.spriteChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ spriteChecked: current })
      break
      case 'sundrop' :
        var current = this.state.sundropChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ sundropChecked: current })
      break
      case 'cherrylemonsundrop' :
        var current = this.state.cherryLemonSundropChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ cherryLemonSundropChecked: current })
      break
      case 'cherryfanta' :
        var current = this.state.cherryFantaChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ cherryFantaChecked: current })
      break
      case 'drpepper' :
        var current = this.state.drPepperChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ drPepperChecked: current })
      break
      case 'goldpeaktea' :
        var current = this.state.goldPeakTeaChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ goldPeakTeaChecked: current })
      break
      case 'countrytimelemonade' :
        var current = this.state.countryTimeLemonadeChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ countryTimeLemonadeChecked: current })
      break
      case 'mayo' :
        var current = this.state.mayoChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ mayoChecked: current })
      break
      case 'powdered' :
        var current = this.state.powderedChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ powderedChecked: current })
      break
      case 'cinnamonSugar' :
        var current = this.state.cinnamonSugarChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ cinnamonSugarChecked: current })
      break
      case 'chocolateSyrup' :
        var current = this.state.chocolateSyrupChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ chocolateSyrupChecked: current })
      break
      case 'strawberrySyrup' :
        var current = this.state.strawberrySyrupChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ strawberrySyrupChecked: current })
      break
      case 'lemon' :
        var current = this.state.lemonChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ lemonChecked: current })
      break
      case 'chocolateChip' :
        var current = this.state.chocolateChipChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ chocolateChipChecked: current })
      break
      case 'oatmealRaisin' :
        var current = this.state.oatmealRaisinChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ oatmealRaisinChecked: current })
      break
      case 'peanutButter' :
        var current = this.state.peanutButterChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ peanutButterChecked: current })
      break
      case 'pepperoni' :
        var current = this.state.pepperoniChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ pepperoniChecked: current })
      break
      case 'sausage' :
        var current = this.state.sausageChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ sausageChecked: current })
      break
      case 'vanilla' :
        var current = this.state.vanillaChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ vanillaChecked: current })
      break
      case 'chocolate' :
        var current = this.state.chocolateChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ chocolateChecked: current })
      break
      case 'greenMintChocolateChip' :
        var current = this.state.greenMintChocolateChipChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ greenMintChocolateChipChecked: current })
      break
      case 'sugar' :
        var current = this.state.sugarChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ sugarChecked: current })
      break
      case 'creamer' :
        var current = this.state.creamerChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ creamerChecked: current })
      break
      case 'splenda' :
        var current = this.state.splendaChecked;
        current[itemIndex+which] = !current[itemIndex+which];
        this.setState({ splendaChecked: current })
      break
    }

    if(index === -1) {
      prevCart.condiments.push(item)
    }
    else {
      prevCart.condiments.splice(index, 1)
    }
    
    let finalCart = cartData;
    finalCart[this.state.itemToUpdate] = prevCart;

    setCartData(finalCart)
  }

  

  buildItems() {
    const { publicFoodItems } = this.context
    const state = this.state
    const options = ["0", 1, 2, 3]
    const foodItemDropdown = (key, index, price, title) => (
      <>
        <CustomPicker
          options={options}
          textStyle={{fontSize: 24}}
          value={this.state.checked[key]}
          onValueChange={(quantity) => this.updateFoodItemQuantity(index, key, price, title, quantity)}
        />
      </>
    )

    const wrapper = (data) => {
      return <Text style={RaptorFormStyles.cell}>{data}</Text>
    }

    const displayCondiment = (title, value, label, ckey) => {
      return <View style={styles.foodOption}>
        <Text style={{ flex: 1 }}>{title}</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => this.updateFoodItem(label, ckey)}
          value={value}
        />
      </View>
    }
    
    var itemIndex = this.state.itemToUpdate;

    let foodOptions = <Text></Text>
    switch(this.state.itemToUpdateTitle) {
      case 'Hamburger' :
      case 'Cheeseburger' :
      case 'Double Cheeseburger' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Onions', this.state.onionChecked[itemIndex+0], 'onions', 0)}
        {displayCondiment('Relish', this.state.relishChecked[itemIndex+0], 'relish', 0)}
        {displayCondiment('Dill Pickle Slices', this.state.dillPickleChecked[itemIndex+0], 'dillpickles', 0)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+0], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+0], 'mustard', 0)}
        </>
      break;
      case 'Spicy Chicken Sandwich' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+0], 'bbq', 0)}
        {displayCondiment('Mayonnaise', this.state.mayoChecked[itemIndex+0], 'mayo', 0)}
        {displayCondiment('Cheese ($1.00)', this.state.cheeseChecked[itemIndex+0], 'cheese', 0)}
        {displayCondiment('Dill Pickle Slices', this.state.dillPickleChecked[itemIndex+0], 'dillpickles', 0)}
        </>
      break;
      case 'Hotdog' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Relish', this.state.relishChecked[itemIndex+0], 'relish', 0)}
        {displayCondiment('Onions', this.state.onionChecked[itemIndex+0], 'onions', 0)}
        {displayCondiment('Chili ($1.00)', this.state.chiliChecked[itemIndex+0], 'chili', 0)}
        {displayCondiment('Cheese Sauce ($1.00)', this.state.cheeseChecked[itemIndex+0], 'cheese', 0)}
        {/* {displayCondiment('Slaw', this.state.slawChecked[itemIndex+0], 'slaw', 0)} */}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+0], 'ketchup', 0)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+0], 'mustard', 0)}
        </>
      break;
      case 'Corndog' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+0], 'honeymustard', 0)}
        </>
      break;
      case 'Chicken Tenders' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+0], 'ranch', 0)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+0], 'honeymustard', 0)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+0], 'bbq', 0)}
        </>
      break;
      case 'Regular Popcorn' :
      case 'Large Popcorn' :
      case 'Tub Popcorn' :
      case 'Bucket Popcorn' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Butter', this.state.butterChecked[itemIndex+0], 'butter', 0)}
        </>
      break;
      case 'French Fries' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Cheese Sauce ($1.00)', this.state.cheeseChecked[itemIndex+0], 'cheese', 0)}
        {displayCondiment('Chili ($1.00)', this.state.chiliChecked[itemIndex+0], 'chili', 0)}
        </>
      break;
      case 'Soft Pretzel' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Cheese Sauce ($1.00)', this.state.cheeseChecked[itemIndex+0], 'cheese', 0)}
        </>
      break;
      case 'Coffee' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Sugar', this.state.sugarChecked[itemIndex+0], 'sugar', 0)}
        {displayCondiment('Creamer', this.state.creamerChecked[itemIndex+0], 'creamer', 0)}
        {displayCondiment('Splenda', this.state.splendaChecked[itemIndex+0], 'splenda', 0)}
        </>
      break;
      case 'Small Drink' :
      case 'Large Drink' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Pepsi', this.state.pepsiChecked[itemIndex+0], 'pepsi', 0)}
        {displayCondiment('Diet Pepsi', this.state.dietPepsiChecked[itemIndex+0], 'dietPepsi', 0)}
        {displayCondiment('Sierra Mist', this.state.sierraMistChecked[itemIndex+0], 'sierraMist', 0)}
        {displayCondiment('Mug Root Beer', this.state.mugRootBeerChecked[itemIndex+0], 'mugRootBeer', 0)}
        {displayCondiment('Mtn Dew', this.state.mtnDewChecked[itemIndex+0], 'mtnDew', 0)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[itemIndex+0], 'drPepper', 0)}
        {displayCondiment('Rasberry Brisk Tea', this.state.goldPeakTeaChecked[itemIndex+0], 'goldPeakTea', 0)}
        </>
      break;
      case 'Small Pizza' :
      case 'Large Pizza' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Pepperoni ($1.00)', this.state.pepperoniChecked[itemIndex+0], 'pepperoni', 0)}
        {displayCondiment('Sausage ($1.00)', this.state.sausageChecked[itemIndex+0], 'sausage', 0)}
        {displayCondiment('Onions ($1.00)', this.state.onionChecked[itemIndex+0], 'onions', 0)}
        {displayCondiment('Jalapenos ($1.00)', this.state.jalapenosChecked[itemIndex+0], 'jalapenos', 0)}
        {displayCondiment('Extra Cheese ($1.00)', this.state.cheeseChecked[itemIndex+0], 'cheese', 0)}
        </>
      break;
      case 'Ice Cream Cone' :
      case 'Dish Ice Cream' :
      case 'Milkshake' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Vanilla', this.state.vanillaChecked[itemIndex+0], 'vanilla', 0)}
        {displayCondiment('Chocolate', this.state.chocolateChecked[itemIndex+0], 'chocolate', 0)}
        {displayCondiment('Green Mint Chocolate Chip', this.state.greenMintChocolateChipChecked[itemIndex+0], 'greenMintChocolateChip', 0)}
        </>
      break;
      case 'Minute Maid Frozen Lemonade' :
        foodOptions = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Strawberry', this.state.strawberrySyrupChecked[itemIndex+0], 'strawberrySyrup', 0)}
        {displayCondiment('Lemon', this.state.lemonChecked[itemIndex+0], 'lemon', 0)}
        </>
      break;

    }

    let foodOptions2 = <Text></Text>
    switch(this.state.itemToUpdateTitle) {
      case 'Hamburger' :
      case 'Cheeseburger' :
      case 'Double Cheeseburger' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Onions', this.state.onionChecked[itemIndex+1], 'onions', 1)}
        {displayCondiment('Relish', this.state.relishChecked[itemIndex+1], 'relish', 1)}
        {displayCondiment('Dill Pickle Slices', this.state.dillPickleChecked[itemIndex+1], 'dillpickles', 1)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+1], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+1], 'mustard', 1)}
        </>
      break;
      case 'Spicy Chicken Sandwich' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+1], 'bbq', 1)}
        {displayCondiment('Mayonnaise', this.state.mayoChecked[itemIndex+1], 'mayo', 1)}
        {displayCondiment('Cheese ($1.00)', this.state.cheeseChecked[itemIndex+1], 'cheese', 1)}
        {displayCondiment('Dill Pickle Slices', this.state.dillPickleChecked[itemIndex+1], 'dillpickles', 1)}
        </>
      break;
      case 'Hotdog' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Relish', this.state.relishChecked[itemIndex+1], 'relish', 1)}
        {displayCondiment('Onions', this.state.onionChecked[itemIndex+1], 'onions', 1)}
        {displayCondiment('Chili ($1.00)', this.state.chiliChecked[itemIndex+1], 'chili', 1)}
        {displayCondiment('Cheese Sauce ($1.00)', this.state.cheeseChecked[itemIndex+1], 'cheese', 1)}
        {/* {displayCondiment('Slaw', this.state.slawChecked[itemIndex+0], 'slaw', 0)} */}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+1], 'ketchup', 1)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+1], 'mustard', 1)}
        </>
      break;
      case 'Corndog' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+1], 'honeymustard', 1)}
        </>
      break;
      case 'Chicken Tenders' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+1], 'ranch', 1)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+1], 'honeymustard', 1)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+1], 'bbq', 1)}
        </>
      break;
      case 'Regular Popcorn' :
      case 'Large Popcorn' :
      case 'Tub Popcorn' :
      case 'Bucket Popcorn' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Butter', this.state.butterChecked[itemIndex+1], 'butter', 1)}
        </>
      break;
      case 'French Fries' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Cheese Sauce ($1.00)', this.state.cheeseChecked[itemIndex+1], 'cheese', 1)}
        {displayCondiment('Chili ($1.00)', this.state.chiliChecked[itemIndex+1], 'chili', 1)}
        </>
      break;
      case 'Soft Pretzel' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Cheese Sauce ($1.00)', this.state.cheeseChecked[itemIndex+1], 'cheese', 1)}
        </>
      break;
      case 'Coffee' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Sugar', this.state.sugarChecked[itemIndex+1], 'sugar', 1)}
        {displayCondiment('Creamer', this.state.creamerChecked[itemIndex+1], 'creamer', 1)}
        {displayCondiment('Splenda', this.state.splendaChecked[itemIndex+1], 'splenda', 1)}
        </>
      break;
      case 'Small Drink' :
      case 'Large Drink' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Pepsi', this.state.pepsiChecked[itemIndex+1], 'pepsi', 1)}
        {displayCondiment('Diet Pepsi', this.state.dietPepsiChecked[itemIndex+1], 'dietPepsi', 1)}
        {displayCondiment('Sierra Mist', this.state.sierraMistChecked[itemIndex+1], 'sierraMist', 1)}
        {displayCondiment('Mug Root Beer', this.state.mugRootBeerChecked[itemIndex+1], 'mugRootBeer', 1)}
        {displayCondiment('Mtn Dew', this.state.mtnDewChecked[itemIndex+1], 'mtnDew', 1)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[itemIndex+1], 'drPepper', 1)}
        {displayCondiment('Rasberry Brisk Tea', this.state.goldPeakTeaChecked[itemIndex+1], 'goldPeakTea', 1)}
        </>
      break;
      case 'Small Pizza' :
      case 'Large Pizza' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Pepperoni ($1.00)', this.state.pepperoniChecked[itemIndex+1], 'pepperoni', 1)}
        {displayCondiment('Sausage ($1.00)', this.state.sausageChecked[itemIndex+1], 'sausage', 1)}
        {displayCondiment('Onions ($1.00)', this.state.onionChecked[itemIndex+1], 'onions', 1)}
        {displayCondiment('Jalapenos ($1.00)', this.state.jalapenosChecked[itemIndex+1], 'jalapenos', 1)}
        {displayCondiment('Extra Cheese ($1.00)', this.state.cheeseChecked[itemIndex+1], 'cheese', 1)}
        </>
      break;
      case 'Ice Cream Cone' :
      case 'Dish Ice Cream' :
      case 'Milkshake' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Vanilla', this.state.vanillaChecked[itemIndex+1], 'vanilla', 1)}
        {displayCondiment('Chocolate', this.state.chocolateChecked[itemIndex+1], 'chocolate', 1)}
        {displayCondiment('Green Mint Chocolate Chip', this.state.greenMintChocolateChipChecked[itemIndex+1], 'greenMintChocolateChip', 1)}
        </>
      break;
      case 'Minute Maid Frozen Lemonade' :
        foodOptions2 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Strawberry', this.state.strawberrySyrupChecked[itemIndex+1], 'strawberrySyrup', 1)}
        {displayCondiment('Lemon', this.state.lemonChecked[itemIndex+1], 'lemon', 1)}
        </>
      break;

    }
    let foodOptions3 = <Text></Text>
    switch(this.state.itemToUpdateTitle) {
      case 'Hamburger' :
      case 'Cheeseburger' :
      case 'Double Cheeseburger' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Onions', this.state.onionChecked[itemIndex+2], 'onions', 2)}
        {displayCondiment('Relish', this.state.relishChecked[itemIndex+2], 'relish', 2)}
        {displayCondiment('Dill Pickle Slices', this.state.dillPickleChecked[itemIndex+2], 'dillpickles', 2)}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+2], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+2], 'mustard', 2)}
        </>
      break;
      case 'Spicy Chicken Sandwich' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+2], 'bbq', 2)}
        {displayCondiment('Mayonnaise', this.state.mayoChecked[itemIndex+2], 'mayo', 2)}
        {displayCondiment('Cheese ($1.00)', this.state.cheeseChecked[itemIndex+2], 'cheese', 2)}
        {displayCondiment('Dill Pickle Slices', this.state.dillPickleChecked[itemIndex+2], 'dillpickles', 2)}
        </>
      break;
      case 'Hotdog' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Relish', this.state.relishChecked[itemIndex+2], 'relish', 2)}
        {displayCondiment('Onions', this.state.onionChecked[itemIndex+2], 'onions', 2)}
        {displayCondiment('Chili ($1.00)', this.state.chiliChecked[itemIndex+2], 'chili', 2)}
        {displayCondiment('Cheese Sauce ($1.00)', this.state.cheeseChecked[itemIndex+2], 'cheese', 2)}
        {/* {displayCondiment('Slaw', this.state.slawChecked[itemIndex+0], 'slaw', 0)} */}
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ketchup', this.state.ketchupChecked[itemIndex+2], 'ketchup', 2)}
        {displayCondiment('Mustard', this.state.mustardChecked[itemIndex+2], 'mustard', 2)}
        </>
      break;
      case 'Corndog' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+2], 'honeymustard', 2)}
        </>
      break;
      case 'Chicken Tenders' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select Sauce:</Text></View>
        {displayCondiment('Ranch', this.state.ranchChecked[itemIndex+2], 'ranch', 2)}
        {displayCondiment('Honey Mustard', this.state.honeyMustardChecked[itemIndex+2], 'honeymustard', 2)}
        {displayCondiment('BBQ', this.state.bbqChecked[itemIndex+2], 'bbq', 2)}
        </>
      break;
      case 'Regular Popcorn' :
      case 'Large Popcorn' :
      case 'Tub Popcorn' :
      case 'Bucket Popcorn' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Butter', this.state.butterChecked[itemIndex+2], 'butter', 2)}
        </>
      break;
      case 'French Fries' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Cheese Sauce ($1.00)', this.state.cheeseChecked[itemIndex+2], 'cheese', 2)}
        {displayCondiment('Chili ($1.00)', this.state.chiliChecked[itemIndex+2], 'chili', 2)}
        </>
      break;
      case 'Soft Pretzel' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Cheese Sauce ($1.00)', this.state.cheeseChecked[itemIndex+2], 'cheese', 2)}
        </>
      break;
      case 'Coffee' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Sugar', this.state.sugarChecked[itemIndex+2], 'sugar', 2)}
        {displayCondiment('Creamer', this.state.creamerChecked[itemIndex+2], 'creamer', 2)}
        {displayCondiment('Splenda', this.state.splendaChecked[itemIndex+2], 'splenda', 2)}
        </>
      break;
      case 'Small Drink' :
      case 'Large Drink' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Pepsi', this.state.pepsiChecked[itemIndex+2], 'pepsi', 2)}
        {displayCondiment('Diet Pepsi', this.state.dietPepsiChecked[itemIndex+2], 'dietPepsi', 2)}
        {displayCondiment('Sierra Mist', this.state.sierraMistChecked[itemIndex+2], 'sierraMist', 2)}
        {displayCondiment('Mug Root Beer', this.state.mugRootBeerChecked[itemIndex+2], 'mugRootBeer', 2)}
        {displayCondiment('Mtn Dew', this.state.mtnDewChecked[itemIndex+2], 'mtnDew', 2)}
        {displayCondiment('Dr Pepper', this.state.drPepperChecked[itemIndex+2], 'drPepper', 2)}
        {displayCondiment('Rasberry Brisk Tea', this.state.goldPeakTeaChecked[itemIndex+2], 'goldPeakTea', 2)}
        </>
      break;
      case 'Small Pizza' :
      case 'Large Pizza' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Pepperoni ($1.00)', this.state.pepperoniChecked[itemIndex+2], 'pepperoni', 2)}
        {displayCondiment('Sausage ($1.00)', this.state.sausageChecked[itemIndex+2], 'sausage', 2)}
        {displayCondiment('Onions ($1.00)', this.state.onionChecked[itemIndex+2], 'onions', 2)}
        {displayCondiment('Jalapenos ($1.00)', this.state.jalapenosChecked[itemIndex+2], 'jalapenos', 2)}
        {displayCondiment('Extra Cheese ($1.00)', this.state.cheeseChecked[itemIndex+2], 'cheese', 2)}
        </>
      break;
      case 'Ice Cream Cone' :
      case 'Dish Ice Cream' :
      case 'Milkshake' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Vanilla', this.state.vanillaChecked[itemIndex+2], 'vanilla', 2)}
        {displayCondiment('Chocolate', this.state.chocolateChecked[itemIndex+2], 'chocolate', 2)}
        {displayCondiment('Green Mint Chocolate Chip', this.state.greenMintChocolateChipChecked[itemIndex+2], 'greenMintChocolateChip', 2)}
        </>
      break;
      case 'Minute Maid Frozen Lemonade' :
        foodOptions3 = <>
        <View style={styles.foodOptionHeading}><Text style={styles.foodOptionHeadingText}>Select your options:</Text></View>
        {displayCondiment('Strawberry', this.state.strawberrySyrupChecked[itemIndex+2], 'strawberrySyrup', 2)}
        {displayCondiment('Lemon', this.state.lemonChecked[itemIndex+2], 'lemon', 2)}
        </>
      break;

    }

    let foodHeading = <Text style={{ color: '#111', fontSize: 18 }}>{this.state.itemToUpdateTitle}</Text>

    let foodOptionsMarkup = <><View style={styles.foodHeading}>{foodHeading}<Text> #1</Text></View>{foodOptions}</>
    if(this.state.itemToUpdateQuantity >= 2) {
      foodOptionsMarkup = <>{foodOptionsMarkup}<View style={styles.foodHeading}>{foodHeading}<Text style={{ color: '#111', fontSize: 18 }}> #2</Text></View>{foodOptions2}</>
    }
    if(this.state.itemToUpdateQuantity >= 3) {
      foodOptionsMarkup = <>{foodOptionsMarkup}<View style={styles.foodHeading}>{foodHeading}<Text style={{ color: '#111', fontSize: 18 }}> #3</Text></View>{foodOptions3}</>
    }

    return (
      <View style={RaptorFormStyles.container}>
        <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.")
        }}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.foodOptionContainer}>
            {foodOptionsMarkup}
          </ScrollView>

          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
            onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}
          >
            <Text style={styles.modalButton}>CLOSE OPTIONS</Text>
          </TouchableHighlight>
        </View>
      </Modal>
        <View style={RaptorFormStyles.heading}><Text style={RaptorFormStyles.headingText}>FROM THE GRILL</Text></View>
        <Table style={{ marginBottom: 24 }}>
          <Row data={this.props.tableHead} style={RaptorFormStyles.tableHeading} textStyle={RaptorFormStyles.rowTextStyle}/>
          {
            publicFoodItems[0].map((rowData, rowIndex) => (
              <TableWrapper key={rowIndex} style={RaptorFormStyles.tableWrapper}>
                {
                  rowData.map((cellData, cellIndex) => (
                    cellIndex != 3 ? <Cell key={cellIndex} data={cellIndex === 2 ? foodItemDropdown(rowData[3], rowData[3], rowData[1], rowData[0]) : cellIndex === 1 ? '$' + cellData : wrapper(cellData)} textStyle={RaptorFormStyles.text}/> : <Text key={cellIndex}></Text>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
        <View style={RaptorFormStyles.heading}><Text style={RaptorFormStyles.headingText}>SNACKS</Text></View>
         <Table style={{ marginBottom: 24 }}>
          <Row data={this.props.tableHead} style={RaptorFormStyles.tableHeading} textStyle={RaptorFormStyles.rowTextStyle}/>
          {
            publicFoodItems[1].map((rowData, rowIndex) => (
              <TableWrapper key={rowIndex} style={RaptorFormStyles.tableWrapper}>
                {
                  rowData.map((cellData, cellIndex) => (
                    cellIndex != 3 ? <Cell key={cellIndex} data={cellIndex === 2 ? foodItemDropdown(rowData[3], rowData[3], rowData[1], rowData[0]) : cellIndex === 1 ? '$' + cellData : wrapper(cellData)} textStyle={RaptorFormStyles.text}/> : <Text key={cellIndex}></Text>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
        <View style={RaptorFormStyles.heading}><Text style={RaptorFormStyles.headingText}>BEVERAGES</Text></View>
         <Table style={{ marginBottom: 24 }}>
          <Row data={this.props.tableHead} style={RaptorFormStyles.tableHeading} textStyle={RaptorFormStyles.rowTextStyle}/>
          {
            publicFoodItems[2].map((rowData, rowIndex) => (
              <TableWrapper key={rowIndex} style={RaptorFormStyles.tableWrapper}>
                {
                  rowData.map((cellData, cellIndex) => (
                    cellIndex != 3 ? <Cell key={cellIndex} data={cellIndex === 2 ? foodItemDropdown(rowData[3], rowData[3], rowData[1], rowData[0]) : cellIndex === 1 ? '$' + cellData : wrapper(cellData)} textStyle={RaptorFormStyles.text}/> : <Text key={cellIndex}></Text>
                  ))
                }
              </TableWrapper>
            ))
          }
        </Table>
      </View>
    )
  }

  render() {
    return (
      <>
        {this.buildItems()}
      </>
    )
  }
}

const styles = StyleSheet.create({
  foodOption: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5
  },
  foodHeading: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#DDD',
    paddingLeft: 12,
    paddingTop: 8,
    paddingBottom: 8
  },
  modalButton: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  foodOptionContainer: { 
    backgroundColor: 'white', 
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 16,
    paddingBottom: 16
  },
  foodOptionHeading: {
    backgroundColor: "#cb4a4a",
    padding: 6
  },
  foodOptionHeadingText: {
    color: "white"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  checkbox: {
    alignSelf: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
    padding: 30
  },
  innerContainer: {
    alignItems: 'center',
    padding: 40
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 12
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})

const RaptorFormStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 22,
    borderWidth: 1,
    borderColor: "#CCC"
  },
  buttonText: {
    color: "white",
  },
  onePicker: {
    width: 100,
    height: 44,
    backgroundColor: '#FFF0E0',
    borderColor: 'black',
    borderWidth: 1,
  },
  onePickerItem: {
    height: 44,
    color: 'red'
  },
  cell: {
    paddingRight: 24
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  heading: {
    backgroundColor: colors.primary,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 18
  },
  headingText: {
    color: "white",
    fontFamily: "poppins-normal"
  },
  rowTextStyle: {
    fontSize: 17
  },
  tableHeading: {
    backgroundColor: "#EEE",
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 18
  }, 
  tableWrapper: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 18
  },
  text: {
    fontSize: 17
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 10,
    width: "80%",
  },
  textInput: {
    backgroundColor: "white",
    fontSize: 17,
    width: 60,
    borderWidth: 1,
    borderColor: "#CCC"
  },
  textInputWrap: {
    backgroundColor: "white",
    width: 35
  }, 
  tableWrap: {
    marginTop: 24
  },
  submitButton: {
    marginTop: 24
  }
})

