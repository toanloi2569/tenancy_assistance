import React from 'react';
import 'antd/dist/antd.css';
// import { Row, Col } from 'antd';
import axios from 'axios';
import { Card, Col, Row } from 'antd';
// import { Input} from 'antd';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';






class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state =  ({
            viewProfile: [''],
            username : '',
            address: '',
            phone: '',
            img : [],
            email: '',
        });
        this.handleLoad = this.handleLoad.bind(this)
    }
    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
        

    }
    componentDidUpdate(){
        
    }

    handleEdit(e){
        console.log(e)
    }
    
    handleLoad() {
        var self = this;
        var apiBaseUrl = "http://localhost:9000/users/";
        axios.get(apiBaseUrl+'profileUser', { 'headers': { 'Authorization': localStorage.token } })
        .then((response)=> {
        console.log(response);
        

        if(response.status === 200 ){
            console.log("Login successfull");
            self.setState({
                username: response.data.name,
                address : response.data.address,
                email : response.data.email,
                phone: response.data.phone,
                img: response.data.img
            })
        

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
        localStorage.removeItem("token")
        });
    }
    render() {
        {this.handleLoad}
        
        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
            <Row gutter={32}>
              <Col span={16}>
                <Card title="Thông tin cá nhân" bordered={false}>
                <label>Họ và tên:</label>

                <div className="form-group">
                    <input type="text" className="form-control" id="" placeholder={this.state.username}/>
                </div>
                <label>Địa chỉ :</label>

                <div className="form-group">
                    <input type="text" className="form-control" id="" placeholder={this.state.address}/>
                </div>
                <label>Email: </label>

                <div className="form-group">
                    <input type="text" className="form-control" id="" placeholder={this.state.email}/>
                </div>
                <label>Phone:</label>

                <div className="form-group">
                    <input type="text" className="form-control" id="" placeholder={this.state.phone}/>
                </div>
                <label>Image CMT:</label>

                {/* <div className="form-group">
                    <input type="text" className="form-control" id="" placeholder={this.state.img}/>
                </div> */}
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Image User" bordered={false} >

                </Card>
              </Col>
            
            </Row>
          </div>


        )
    }
}
export default Profile;