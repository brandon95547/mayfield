import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Icon, Button } from 'native-base'
import MenuDrawer from 'react-native-side-drawer'
import Header from '../Header'
import SideBar from '../SideBar'
import { globals, componentStyles, colors } from '../GlobalStyles'
import UserContext from '../../UserContext'

export default class MyOrdersScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      assetsLoaded: false,
      open: false,
      foodItems: [],
      tableHead: ["Name", "ID", "Ready"],
    }

    this.toggleOpen = this.toggleOpen.bind(this)

  }

  static contextType = UserContext

  componentDidMount() {
    this.getOrders()
    setTimeout(() => {
      this.setState({ assetsLoaded: true })
    }, 2000);
  }

  getOrders() {
    const { setOrderItems, user } = this.context
    if(user !== null) {
      var xmlhttp = new XMLHttpRequest() // new HttpRequest instance
      xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let response = JSON.parse(this.responseText)

          setOrderItems(response)
          console.log(response);
        }
      }

      var theUrl = "http://bluechipadvertising.com/getOrderItemsUser.php?site_id=3&user_id=" + user.user_id
      xmlhttp.open("POST", theUrl)
      xmlhttp.setRequestHeader("Content-Type", "application/jsoncharset=UTF-8")
      xmlhttp.send(JSON.stringify({ action: "get-items" }))
    }
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

  editOrder(item) {
    const { setOrderToEdit } = this.context
    setOrderToEdit(item)
    this.props.navigation.navigate("EditOrder")
  }

  render() {
    const { orderItems, user } = this.context
    const { assetsLoaded } = this.state;

    const loginMessage = user === null ? <Text style={{ fontSize: 18, marginTop: 8 }}>You must<Text onPress={() => this.props.navigation.navigate("Login")} style={{ color: "blue" }}> Login</Text> to view your orders.</Text> : <></>
    
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
                <Text style={styles.pageTitle}>ORDER MANAGEMENT</Text>
              </View>

              <Table style={{ marginTop: 20 }}>
                <Row data={this.state.tableHead} style={styles.tableHeading} textStyle={styles.rowTextStyle}/>
                {
                  orderItems.map((rowData, rowIndex) => (
                    <TableWrapper key={rowIndex} style={styles.tableWrapper}>
                      {
                        rowData.map((cellData, cellIndex) => (
                          cellIndex != 4 ? <Cell key={cellIndex} data={cellData} textStyle={styles.text}/> : <Text key={cellIndex}></Text>
                        ))
                      }
                    </TableWrapper>
                  ))
                }
              </Table>

              {loginMessage}

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
  pageTitleWrap: {
    alignItems: "center"
  },
  pageTitle: {
    fontSize: 16,
    fontWeight: "bold"
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
  rowTextStyle: {
    fontSize: 17
  },
})