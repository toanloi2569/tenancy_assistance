import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';
import TopBar from './components/TopBar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import 'antd/dist/antd.css';
import './index.css';
import { Upload, Icon, Modal } from 'antd';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class Register extends Component {
  constructor(props) {
    super(props);
    var localregisterComponent = [];
    localregisterComponent.push(
      <MuiThemeProvider key={"theme"}>
        <div>
          <TextField
            hintText="User name Tenant"
            floatingLabelText="Tenant Id"
            onChange={(event, newValue) => this.setState({ username: newValue })}
          />
          <br />
          <TextField
            type="email"
            hintText="Enter your Email"
            floatingLabelText="Email Tenant"
            onChange={(event, newValue) => this.setState({ email: newValue })}
          />
          <br />
          <TextField
            type="password"
            hintText="Enter your Password"
            floatingLabelText="Password Tenant"
            onChange={(event, newValue) => this.setState({ password: newValue })}
          />
          <br />

          <TextField
            hintText="Enter your Phone "
            floatingLabelText="Phone Tenant"
            onChange={(event, newValue) => this.setState({ phone: newValue })}
          />
          <br />
          <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
        </div>
      </MuiThemeProvider>
    )
    this.state = {
      // first_name: '',
      // last_name: '',
      username: '',
      email: '',
      password: '',
      menuValue: 1,
      phone: '',
      registerComponent: localregisterComponent,
      registerRole: 'Tenant',

      previewVisible: false,
      previewImage: '',
      fileList: [
        // {
        //   uid: '-4',
        //   name: 'image.png',
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        {
          uid: '-5',
          name: 'image.png',
          status: 'error',
        }
      ],



    }
  }
  handleCancel = () => this.setState({ previewVisible: false });
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  componentWillMount() {

    if (this.props.role !== undefined) {
      var localregisterComponent = [];
      if (this.props.role === 'Tenant') {
        console.log("in Tenant componentWillMount");
        // var localregisterComponent=[];
        localregisterComponent.push(
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
                floatingLabelText="Password Tenant "
                onChange={(event, newValue) => this.setState({ password: newValue })}
              />
              <br />
              <TextField
                type="email"
                hintText="Enter your email"
                floatingLabelText="Email Tenant"
                onChange={(event, newValue) => this.setState({ email: newValue })}
              />
              <br />
              <TextField
                type="value"
                hintText="Enter your phone"
                floatingLabelText="Phone Tenant"
                onChange={(event, newValue) => this.setState({ phone: newValue })}
              />
              <br />
              <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
            </div>
          </MuiThemeProvider>
        )
        this.setState({ menuValue: 1, registerComponent: localregisterComponent, registerRole: 'Tenant' })
      }
      else if (this.props.role === 'Host') {
        console.log("in Host componentWillMount");
        // var localregisterComponent=[];
        localregisterComponent.push(
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
                floatingLabelText="Password Host"
                onChange={(event, newValue) => this.setState({ password: newValue })}
              />
              <br />
              <TextField
                type="email"
                hintText="Enter your email"
                floatingLabelText="Email Host"
                onChange={(event, newValue) => this.setState({ email: newValue })}
              />
              <br />
              <TextField
                type="value"
                hintText="Enter your phone"
                floatingLabelText="Phone Host"
                onChange={(event, newValue) => this.setState({ phone: newValue })}
              />
              <br />

              <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
            </div>
          </MuiThemeProvider>
        )
        this.setState({ menuValue: 2, registerComponent: localregisterComponent, registerRole: 'Host' })
      }
    }

  }
  handleClick(event) {
    console.log("values in register handler", this.state.registerRole)
    console.log("values in register handler", this.state)
    var apiBaseUrl = "http://localhost:4000/api/";
    // console.log("values in register handler",role);
    var self = this;
    //To be done:check for empty values before hitting submit
    if (this.state.username.length > 0 && this.state.email.length > 0 && this.state.password.length > 0 && this.state.phone.length > 0) {
      var payload = {
        // "first_name": this.state.first_name,
        "username": this.state.username,
        "userid": this.state.email,
        "password": this.state.password,
        "role": this.state.registerRole,
        "img": this.state.fileList
      }
      console.log(payload)
      axios.post(apiBaseUrl + '/register', payload)
        .then(function (response) {
          console.log(response);
          if (response.data.code === 200) {
            console.log("registration successfull");
            var loginscreen = [];
            loginscreen.push(<Login parentContext={this} appContext={self.props.appContext} role={self.props.role} />);
            var loginmessage = "Not Registered yet.Go to registration";
            self.props.parentContext.setState({
              loginscreen: loginscreen,
              loginmessage: loginmessage,
              buttonLabel: "Register",
              isLogin: true
            });
          }
          else {
            console.log("some error ocurred", response.data.code);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    else {
      alert("Input field value is missing");
    }

  }


  handleMenuChange(value) {
    console.log("menuvalue", value);
    var localregisterComponent = [];
    var registerRole;
    if (value === 1) {
      // var localregisterComponent = [];
      registerRole = 'Tenant';
      localregisterComponent.push(
        <MuiThemeProvider key='{theme}'>
          <div>
            <TextField
              hintText="Enter your name"
              floatingLabelText="Tenant Id"
              onChange={(event, newValue) => this.setState({ username: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your password"
              floatingLabelText="Password Tenant "
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <TextField
              type="email"
              hintText="Enter your email"
              floatingLabelText="Email Tenant"
              onChange={(event, newValue) => this.setState({ email: newValue })}
            />
            <br />
            <TextField
              type="value"
              hintText="Enter your phone"
              floatingLabelText="Phone Tenant"
              onChange={(event, newValue) => this.setState({ phone: newValue })}
            />
            <br />
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
          </div>
        </MuiThemeProvider>
      )
    }
    else if (value === 2) {
      // var localregisterComponent = [];
      registerRole = 'Host';
      localregisterComponent.push(
        <MuiThemeProvider key='{theme}'>
          <div>
            <TextField
              hintText="Enter your name host"
              floatingLabelText="Host Id"
              onChange={(event, newValue) => this.setState({ username: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password Host "
              onChange={(event, newValue) => this.setState({ password: newValue })}
            />
            <br />
            <TextField
              type="email"
              hintText="Enter your email"
              floatingLabelText="Email Host"
              onChange={(event, newValue) => this.setState({ email: newValue })}
            />
            <br />
            <TextField
              type="value"
              hintText="Enter your phone"
              floatingLabelText="Phone Host"
              onChange={(event, newValue) => this.setState({ phone: newValue })}
            />
            <br />
            <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
          </div>
        </MuiThemeProvider>
      )
    }
    this.setState({
      menuValue: value,
      registerComponent: localregisterComponent,
      registerRole: registerRole,

    })
  }




  render() {
    const previewVisible = this.state.previewVisible;
    const previewImage = this.state.previewImage;
    const fileList = this.state.fileList;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload CMT mặt trước và mặt sau</div>
      </div>
    );
    // console.log("state",this.state.registerRole);

    return (
      <div className="row">
        <TopBar />
        <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4" style={{ marginTop: 8 + 'em' }}>
          <div>
            <MuiThemeProvider>
              <div>
                <AppBar
                  title="Register"
                />
                <div>
                  <p>Register as:</p>
                  <DropDownMenu value={this.state.menuValue} onChange={(event, index, value) => this.handleMenuChange(value)}>
                    <MenuItem value={1} primaryText="Người thuê trọ" />
                    <MenuItem value={2} primaryText="Chủ trọ" />
                  </DropDownMenu>
                </div>
                <br/>
                <div className="clearfix">
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                  >
                    {fileList.length >= 3 ? null : uploadButton}
                  </Upload>
                  <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                </div>
                {this.state.registerComponent}
                <br />
              </div>
            </MuiThemeProvider>

          </div>
        </div>
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Register;
