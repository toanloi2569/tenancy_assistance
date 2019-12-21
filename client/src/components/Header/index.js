import React, { Component } from 'react';
import HostHeader from './HostHeader';
import TenantHeader from './TenantHeader';

const Role = "Host"

export default class Header extends Component{
    render(){
        if(Role == "Host"){
            return(
                <HostHeader/>
            )
        }else{
            return(
                <TenantHeader/>
            )
        }
    }
}