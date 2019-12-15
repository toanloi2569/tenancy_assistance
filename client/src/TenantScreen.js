import React from 'react';
import axios from 'axios';
import TenantHeader from './components/Header/TenantHeader';

class TenantScreen extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount() {
        window.addEventListener('load', this.handleLoad);
    }
    
    handleLoad() {
        var apiBaseUrl = "http://localhost:9000/users/";
        axios.get(apiBaseUrl+'profileUser', { 'headers': { 'Authorization': localStorage.token } })
        .then(function (response) {
        console.log(response);
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

    render(){
        return(
            <div>
                <TenantHeader/>
                !!This is Tenant Screen
            </div>
        )
    }
}
export default TenantScreen;