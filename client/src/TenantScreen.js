import React from 'react';
import TenantHeader from './components/Header/TenantHeader';

class TenantScreen extends React.Component{
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
export default TenantScreen;