import React from 'react';
import TenantHeader from './components/Header/TenantHeader';

class TenantProfile extends React.Component{
    constructor(props){
        super(props);
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
export default TenantProfile;