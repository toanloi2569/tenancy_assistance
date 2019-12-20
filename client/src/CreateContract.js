import React from 'react';
import HostHeader from './components/Header/HostHeader';
import 'antd/dist/antd.css';
import { Card, Col, Row } from 'antd';
import ReactDOM from 'react-dom';
import WrappedDynamicFieldSet from './components/HostComponets/Contract';
import ShowContract from './components/HostComponets/ShowContract';

class CreateContract extends React.Component{
    render(){
        return(
            <div>
                <HostHeader/>
                <br/>
                <br/><br/>
                <div style={{ background: '#ECECEC', padding: '30px' }}>
                    <Row gutter={32}>
                    
                    <Col span={8}>
                        <Card title="Hợp đồng đã Tạo" bordered={false}>
                        
                        {/* <ShowContract/> */}
                        </Card>
                    </Col>
                    <Col span={16}>
                        <Card title="Tạo hợp đồng" bordered={false}>
                        <WrappedDynamicFieldSet/>
                        </Card>
                    </Col>
                    </Row>
                </div>
        
            </div>
        )
    }
}
export default CreateContract;