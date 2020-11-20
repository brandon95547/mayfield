import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Icon, Button } from 'native-base'
import MenuDrawer from 'react-native-side-drawer'
import Header from '../Header'
import SideBar from '../SideBar'
import { globals, componentStyles, colors } from '../GlobalStyles'
import UserContext from '../../UserContext'
import { Audio, Video } from 'expo-av';

export default class AdminFoodScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      assetsLoaded: false,
      open: false,
      foodItems: [],
      tableHead: ["Name", "ID", "Ready", "Edit"],
      played: [],
      editButton: []
    }

    this.toggleOpen = this.toggleOpen.bind(this)

  }

  static contextType = UserContext

  componentDidMount() {
    var _this = this;
    setInterval(function() { 
      _this.getOrders()
    }, 10000);
    setTimeout(() => {
      this.setState({ assetsLoaded: true })
      this.getOrders();
    }, 2000);
  }

  async playAudio() {
    const playbackObject = await Audio.Sound.createAsync(
      { uri: 'http://bluechipadvertising.com/109662__grunz__success.wav' },
      { shouldPlay: true }
    );
  }

  getOrders() {
    var _this = this;
    const { setOrderItems } = this.context
    var xmlhttp = new XMLHttpRequest() // new HttpRequest instance
    var played = this.state.played;
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText)
        setOrderItems(response)
        
        var neworder = false;
        response.forEach(function (value, index) {
          if(value[3] == 0) {
            if(_this.state.played.indexOf(index) === -1) {
              played.push(index);
              neworder = true;
            }
          }
        })
        _this.setState({ played: played })
        if(neworder) {
          _this.playAudio();
        }
        
      }
    }

    var theUrl = "http://bluechipadvertising.com/getOrderItems.php?site_id=3"
    xmlhttp.open("POST", theUrl)
    xmlhttp.setRequestHeader("Content-Type", "application/jsoncharset=UTF-8")
    xmlhttp.send(JSON.stringify({ action: "get-items" }))
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

  editOrder(item, index) {
    const { setOrderToEdit } = this.context
    setOrderToEdit(item)
    this.props.navigation.navigate("EditOrder")
  }

  render() {
    const { orderItems } = this.context
    const { assetsLoaded } = this.state;

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
                        this.state.editButton[rowIndex] || this.state.editButton.length == 0 && 
                        rowData.map((cellData, cellIndex) => (
                          cellIndex != 4 ? <Cell key={cellIndex} data={cellIndex == 3 ? (cellData == 1 ? <Button full light onPress={() => this.editOrder(rowData, rowIndex)}><Text>Edit</Text></Button> : <Button style={componentStyles.buttonCool} full onPress={() => this.editOrder(rowData, rowIndex)}><Text style={{ color: "white" }}>Edit</Text></Button>) : cellData} textStyle={styles.text}/> : <Text key={cellIndex}></Text>
                        ))
                      }
                    </TableWrapper>
                  ))
                }
              </Table>

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