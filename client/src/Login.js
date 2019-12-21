import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import TopBar from './components/TopBar';
import settings from './config';
// import { ContentSort } from 'material-ui/svg-icons';
// import TenantScreen from './TenantScreen';
// import { colors } from 'material-ui/styles';
// import functions from 'material-ui/svg-icons/editor/functions';





class Login extends Component {
  constructor(props) {
    super(props);
    var localloginComponent = [];
    localloginComponent.push(
      <MuiThemeProvider key={"theme"}>
        <div>
          <TextField
            hintText="User name"
            floatingLabelText="Tenant Id"
            onChange={(event, newValue) => this.setState({ username: newValue })}
          />
          <br />
          <TextField
            type="password"
            hintText="Enter your Password"
            floatingLabelText="Password"
            onChange={(event, newValue) => this.setState({ password: newValue })}
          />
          <br />
          <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
        </div>
      </MuiThemeProvider>
    )
    this.state = {
      username: '',
      password: '',
      menuValue: 1,
      loginComponent: localloginComponent,
      loginRole: 'Tenant',
      
    }
  }
  componentWillMount() {
    // console.log("willmount prop values",this.props);
    if (this.props.role !== undefined) {
      var localloginComponent = []
      if (this.props.role === 'Tenant') {
        // console.log("in Tenant componentWillMount");
        localloginComponent.push(
          <MuiThemeProvider>
            <div>
              <TextField
                hintText="Enter your name"
                floatingLabelText="Tenant Id"
                onChange={(event, newValue) => this.setState({ username: newValue })}
              />
              <br />
              <TextField
                type="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                onChange={(event, newValue) => this.setState({ password: newValue })}
              />
              <br />
              <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
            </div>
          </MuiThemeProvider>
        )
        this.setState({ menuValue: 1, loginComponent: localloginComponent, loginRole: 'Tenant' })
      }
      else if (this.props.role === 'Host') {
        // console.log("in Host componentWillMount");
        localloginComponent.push(
          <MuiThemeProvider>
            <div>
              <TextField
                hintText="Enter your name"
                floatingLabelText="Host Id"
                onChange={(event, newValue) => this.setState({ username: newValue })}
              />
              <br />
              <TextField
                type="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                onChange={(event, newValue) => this.setState({ password: newValue })}
              />
              <br />
              <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
            </div>
          </MuiThemeProvider>
        )
        this.setState({ menuValue: 2, loginComponent: localloginComponent, loginRole: 'Host' })
      }
    }
  }
  handleClick(event) {
    var apiBaseUrl = settings.apiBaseUrl;
    var self = this;
    // if (this.state.loginRole === "Tenant") {
    //   self.props.history.push("/tenant")
    // }
    // else {
    //   self.props.history.push("/host")
    // }
      var payload={
        "username":this.state.username,
        "password":this.state.password,
        // "role":this.state.loginRole
      }
      axios.post(apiBaseUrl+'/loginUser', payload)
     .then(function (response) {
       console.log(response);
       if(response.status === 200){
         console.log("Login successfull");
         console.log(self.state)
         localStorage.setItem("token", response.data.token)
         if (response.data.role === 'Tenant' && self.state.menuValue === 1 ){
          var id = ":"+ response.data.id
          self.props.history.push("/listhome/"+id)
         }
         else if(response.data.role === 'Host' && self.state.menuValue === 2)
         {
          var id = ":"+ response.data.id
          self.props.history.push("/host/"+id)
         }
         else{
           alert("Bạn chưa có tài khoản hoặc bạn chọn sai tư cách đăng nhập")
         }

        //  var uploadScreen=[];
        //  uploadScreen.push(<UploadPage appContext={self.props.appContext} role={self.state.loginRole}/>)
        //  self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
       }
       else if(response.status === 204){
         console.log("Username password do not match");
         alert(response.data.success)
       }
       else{
         console.log("Username does not exists");
         alert("Username does not exist");
       }
     })
     .catch(function (error) {
       console.log(error);
     });
  }
  handleMenuChange(value) {
    // console.log("menuvalue",value);
    var loginRole;
    var localloginComponent = []
    if (value === 1) {
      // var localloginComponent=[];
      loginRole = 'Tenant';
      localloginComponent.push(
        <MuiThemeProvider>
          <div>
            <TextField
              hintText="Enter your name"
              floatingLabelText="Tenant Id"
              onChange={(event, newValue) => this.setState({ username: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
          </div>
        </MuiThemeProvider>
      )
    }
    else if (value === 2) {
      // var localloginComponent=[];
      loginRole = 'Host';
      localloginComponent.push(
        <MuiThemeProvider>
          <div>
            <TextField
              hintText="Enter your name"
              floatingLabelText="Host Id"
              onChange={(event, newValue) => this.setState({ username: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
          </div>
        </MuiThemeProvider>
      )
    }
    this.setState({
      menuValue: value,
      loginComponent: localloginComponent,
      loginRole: loginRole
    })
  }
  render() {
    return (
      <div className="row">
        <TopBar />
        <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4" style={{ marginTop: 8 + 'em' }}>
          <div>
            <MuiThemeProvider>
              <AppBar
                title="Login"
              />
            </MuiThemeProvider>
            <MuiThemeProvider>
              <div>
                <p>Login as:</p>
                <DropDownMenu value={this.state.menuValue} onChange={(event, index, value) => this.handleMenuChange(value)}>
                  <MenuItem value={1} primaryText="Người thuê trọ" />
                  <MenuItem value={2} primaryText="Chủ trọ" />
                </DropDownMenu>
              </div>
            </MuiThemeProvider>
            {this.state.loginComponent}
          </div>
        </div>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Login;

