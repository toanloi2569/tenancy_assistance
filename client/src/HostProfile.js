import React from 'react';
import HostHeader from './components/Header/HostHeader';
import Profile from './components/Profile';

class TenantProfile extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                 <HostHeader/>
                !!This is Tenant Screen
                <br/>
                <br/>
                <br/>
                <br/>
                <Profile/>
            </div>
        )
    }
}
export default TenantProfile;