import React from 'react';
import HostHeader from './components/Header/HostHeader';
import UploadScreen from './components/UploadScreen';





class HostScreen extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <HostHeader/>
                !!This is Host Screen

                
            </div>
        )
    }
}
export default HostScreen;