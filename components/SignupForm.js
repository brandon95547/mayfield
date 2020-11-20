import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import FormErrors from "./FormErrors";

export default class SignupForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      phone: "",
      createAccount: 0,
      formErrorsStatus: {
        show: false,
        message: "",
        variant: "success"
      }
    };

    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }

  handleChange = (e) => this.setState({
    [e.target.name]: e.target.value
  });
  showAlert(alertStatus) {
    let _this = this;
    this.setState({
      formErrorsStatus: {
        show: true,
        variant: alertStatus.variant,
        message: alertStatus.message
      }
    });

    setTimeout(function () {
      _this.setState({
        formErrorsStatus: {
          show: false
        }
      });
    }, 2500);
  }
  handleSubmit(event) {
    let _this = this;
    event.preventDefault();

    if (this.state.email != "" && this.state.password != "") {

      var xmlhttp = new XMLHttpRequest(); // new HttpRequest instance
      xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          let response = JSON.parse(this.responseText);
          let alertStatus = {
            variant: response.success
              ? "success"
              : "danger",
            message: response.message
          }
          _this.showAlert(alertStatus);
          localStorage.setItem('user', response.user);
          // match the timeout from show alert before switching pages because the component will not be available to setState, if not
          if(response.success) {
            setTimeout(() => {
              //_this.props.navigation.navigate('Home');
              window.location.reload();
            }, 2500);
          }
        }
      };

      var theUrl = "http://bluechipadvertising.com/signup.php?site_id=2";
      xmlhttp.open("POST", theUrl);
      xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xmlhttp.send(JSON.stringify({email: this.state.email, password: this.state.password, createAccount: this.state.createAccount, phone: this.state.phone}));

    }
  }

  render() {
    const TodoItem = this.props.TodoItem;
    this.state.createAccount = this.props.newAccount ? 1 : 0;

    return (
      <View>
        <Text>Signup Form</Text>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowColor: "#171717",
    shadowOpacity: 0.1
  },
  input: {
    backgroundColor: "#F3F3F3",
    flex: 1,
    fontSize: 18,
    height: 35
  },
  addButton: {
    width: 100,
    backgroundColor: "#FFCE00",
    alignItems: "center",
    justifyContent: "center"
  },
  addButtonText: {
    color: "#171717",
    fontSize: 18,
    fontWeight: "700"
  }
});
