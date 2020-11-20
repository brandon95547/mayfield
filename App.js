import React, { Component } from 'react'
// navigation
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { UserProvider } from './UserContext'
// screens
import HomeScreen from './components/screens/HomeScreen'
import StartPickupScreen from './components/screens/StartPickupScreen'
import LoginScreen from './components/screens/LoginScreen'
import ForgotPassword from './components/screens/ForgotPassword'
import NewAccountScreen from './components/screens/NewAccountScreen'
import CartScreen from './components/screens/CartScreen'
import OrderSuccess from './components/screens/OrderSuccess'
import AdminScreen from './components/screens/AdminScreen'
import AdminFoodScreen from './components/screens/AdminFoodScreen'
import AdminOrdersScreen from './components/screens/AdminOrdersScreen'
import EditFoodScreen from './components/screens/EditFoodScreen'
import EditOrderScreen from './components/screens/EditOrderScreen'
import MyOrdersScreen from './components/screens/MyOrdersScreen'

const Stack = createStackNavigator()

export default class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
            <Stack.Screen name="StartPickup" component={StartPickupScreen} options={{ title: 'Start Pickup Order' }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: 'Login' }} />
            <Stack.Screen name="NewAccount" component={NewAccountScreen} options={{ title: 'New Account' }} />
            <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Cart' }} />
            <Stack.Screen name="OrderSuccess" component={OrderSuccess} options={{ title: 'Order Success' }} />
            <Stack.Screen name="Admin" component={AdminScreen} options={{ title: 'Admin' }} />
            <Stack.Screen name="AdminFood" component={AdminFoodScreen} options={{ title: 'Food Items' }} />
            <Stack.Screen name="AdminOrders" component={AdminOrdersScreen} options={{ title: 'Orders' }} />
            <Stack.Screen name="EditFood" component={EditFoodScreen} options={{ title: 'Edit Item' }} />
            <Stack.Screen name="EditOrder" component={EditOrderScreen} options={{ title: 'Edit Order' }} />
            <Stack.Screen name="MyOrders" component={MyOrdersScreen} options={{ title: 'My Orders' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    )
  }
}