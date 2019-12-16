import React from 'react';
import 'antd/dist/antd.css';
// import { Row, Col } from 'antd';
import axios from 'axios';
import { Card, Col, Row } from 'antd';
import { Input } from 'antd';





class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state =  ({
            viewProfile: [''],
            username : ''
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
        
        var viewProfileComponent = [];
        viewProfileComponent.push(
            // <div>
            // <label>{response.data.user_name}</label>
            // <label> {response.data.name}</label>
            // </div>
            
            <div style={{ background: '#ECECEC', padding: '30px' }}>
            <Row gutter={32}>
              <Col span={16}>
                <Card title="Card title" bordered={false}>
                  Card content
                  
                  <form action="" method="POST" role="form">
                      <legend>Form title</legend>
                  
                      <div class="form-group">
                          <label for="">user_name</label>
                          <input type="text" class="form-control" id="" placeholder="Input field"  value = {response.data.user_name}/>
                      </div>
                  
                      
                  
                      <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                  
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Card title" bordered={false}>
                  Card content
                </Card>
              </Col>
            
            </Row>
          </div>
            
        )
        console.log(viewProfileComponent)
        self.setState({
            username: response.data.name,
            viewProfile : viewProfileComponent
        })

        if(response.status === 200){
            console.log("Login successfull");
        

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
            <div  onLoad = {this.handleLoad} >
                !!! This ís Profile
                <br/>
                <br/>
                <div class="container" >
                {this.state.viewProfile}
                    
                </div>
                
            </div>


        )
    }
}
export default Profile;