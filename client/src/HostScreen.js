import React from 'react';
import HostHeader from './components/Header/HostHeader';
import UploadScreen from './components/UploadScreen';
import 'antd/dist/antd.css';
// import './index.css';.
import { Row, Col } from 'antd';
import FilterHome from './components/FilterHome';



class HostScreen extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <HostHeader/>
                {/*!!This is Host Screen
                <br/><br/><br/>
                <UploadScreen/> */}
                <br/><br/><br/>
                <br/><br/><br/>
                <br/><br/><br/>
                <Row>
                    <Col span={18} push={6}>
                        <UploadScreen/>
                    </Col>
                    <Col span={6} pull={18}>
                        <FilterHome/>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default HostScreen;