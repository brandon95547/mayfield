import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'

const UserContext = React.createContext()

class UserProvider extends Component {
  constructor(props) {
    super(props)
  }

  // Context state
  state = {
    user: null,
    cartData: [],
    cartTotal: 0,
    checkoutCart: null,
    itemToEdit: null,
    orderToEdit: null,
    adminFoodItems: [],
    orderItems: [],
    publicFoodItems: [
      [],[],[],[],[]
    ],
    orderID: "",
    token: null
  }

  setUser = user => {
    this.setState(prevState => ({ user }))
  }
  
  setToken = token => {
    this.setState(prevState => ({ token }))
  }

  setAdminFoodItems = adminFoodItems => {
    this.setState(prevState => ({ adminFoodItems }))
  }

  setOrderItems = orderItems => {
    this.setState(prevState => ({ orderItems }))
  }

  setPublicFoodItems = publicFoodItems => {
    this.setState(prevState => ({ publicFoodItems }))
  }

  setItemToEdit = itemToEdit => {
    this.setState(prevState => ({ itemToEdit }))
  }

  setOrderToEdit = orderToEdit => {
    this.setState(prevState => ({ orderToEdit }))
  }

  _storeData = async (key, data) => {
    try {
      await AsyncStorage.setItem(key, data)
    } catch (error) {
      // Error saving data
    }
  }

  _retrieveCheckout = async (key) => {
    let returnValue = null
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        returnValue = value
      }
    } catch (error) {
      // Error retrieving data
    }
    if(returnValue) {
      this.setState({ cartData: JSON.parse(returnValue)})
    }
  };

  setCartTotal = cartTotal => {
    this.setState(prevState => ({ cartTotal }))
  }

  setCartData = cartData => {
    this.setState(prevState => ({ cartData }))
  }

  setOrderId = orderID => {
    this.setState(prevState => ({ orderID }))
  }

  setCheckoutSummary = checkoutCart => {
    this.setState(prevState => ({ checkoutCart }))
  }

  componentDidMount() {
    this._retrieveCheckout('cart-items')
  }

  componentDidUpdate() {
    this._storeData("user", JSON.stringify(this.state.user))
    this._storeData("cart-items", JSON.stringify(this.state.cartData))
    this._storeData("cart-checkout", JSON.stringify(this.state.checkoutCart))
  }

  isLoggedIn = async key => {
    let returnValue = null
    try {
      const value = await AsyncStorage.getItem('user');
      // console.log("my value", value);
      if (value !== 'null') {
        // We have data!!
        this.setUser(JSON.parse(value))
        console.log('is logged in', value);
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  render() {
    const { children } = this.props
    const { token } = this.state
    const { cartData } = this.state
    const { itemToEdit } = this.state
    const { orderToEdit } = this.state
    const { checkoutCart } = this.state
    const { adminFoodItems } = this.state
    const { orderItems } = this.state
    const { publicFoodItems } = this.state
    const { orderID } = this.state
    const { user } = this.state
    const { cartTotal } = this.state
    const { setUser } = this
    const { setToken } = this
    const { isLoggedIn } = this
    const { setCartData } = this
    const { setCartTotal } = this
    const { setOrderItems } = this
    const { setCheckoutSummary } = this
    const { setItemToEdit } = this
    const { setOrderToEdit } = this
    const { setAdminFoodItems } = this
    const { setPublicFoodItems } = this
    const { setOrderId } = this

    return (
      <UserContext.Provider
        value={{
          user,
          cartData,
          checkoutCart,
          cartTotal,
          orderID,
          itemToEdit,
          orderToEdit,
          adminFoodItems,
          orderItems,
          publicFoodItems,
          token,
          setUser,
          setToken,
          isLoggedIn,
          setCartData,
          setCartTotal,
          setCheckoutSummary,
          setItemToEdit,
          setOrderToEdit,
          setOrderItems,
          setAdminFoodItems,
          setPublicFoodItems,
          setOrderId
        }}
      >
        {children}
      </UserContext.Provider>
    )
  }
}

export default UserContext

export { UserProvider }