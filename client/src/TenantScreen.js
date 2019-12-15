import React from 'react';
import TenantHeader from './components/Header/TenantHeader';
import UploadScreen from './components/UploadScreen';
import FilterHome from './components/FilterHome';
import {Row, Col} from 'antd';
import 'antd/dist/antd.css';
class TenantScreen extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <TenantHeader/>
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
export default TenantScreen;