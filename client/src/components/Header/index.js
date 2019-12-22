import React, { Component } from 'react';
import HostHeader from './HostHeader';
import TenantHeader from './TenantHeader';
import axios from 'axios'
import TopBar from '../TopBar';


export default class Header extends Component{
    constructor(){
        super()
        this.state={
            role:"guest"
        }
    }

    componentDidMount(){
        var apiBaseUrl = "http://localhost:9000/users/";
        setTimeout(()=>{ 
            axios.get(apiBaseUrl+'auth', { 'headers': { 'Authorization': localStorage.token } })
            .then((response)=> {
                if(response.status === 200 ){ 
                    this.setState({ role: response.data })
                }
                console.log(this.state)
            })
        },100)
    }
    render(){
        const {role} = this.state;
        if(role == "Host"){
            return(
                <HostHeader/>
            )
        }
        else if(role=="Tenant"){
            return(
                <TenantHeader/>
            )
        } else{
            return (
                <TopBar/>
            )
        }
    }
}