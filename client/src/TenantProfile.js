import React from 'react';
import TenantHeader from './components/Header/TenantHeader';
import Profile from './components/Profile';

class TenantProfile extends React.Component{
    // constructor(props){
    //     super(props);
    // }
    render(){
        return(
            <div>
                <TenantHeader/>
                !!This is Tenant Screen
                <br/><br/><br/><br/>
                <Profile/>
            </div>
        )
    }
}
export default TenantProfile;