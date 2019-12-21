
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../index.css';
import { Form, Input, Icon, Button } from 'antd';
import { DatePicker } from 'antd';
import PriceInput from './PriceInput';
import ShowContract from './ShowContract';
import axios from 'axios';


let id = 0;

class DynamicFieldSet extends React.Component {
  constructor(props){
    super(props);
    this.state = ({

      ngaytao: '',
      fullnameHost: '',
      fullnameTenant: '',
      cmtHost: '',
      cmtTenant: '',
      address: '',
      addressHost: '',
      addressTenant: '',
      phoneHost: '',
      phoneTenant:'',
      thoihan: '',
      dieukhoan:[],
      mota: '',
      dientich: '',
      price: '',



      



    });
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.checkPrice = this.checkPrice.bind(this)
    this.handleChange = this.handleChange.bind(this)
    
  }



  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  };
  onChange(date, dateString) {
    console.log(date, dateString);
    console.log(date)
    this.setState({
        ngaytao: dateString
    })
  }

  handleChange(event){
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    })

  }

  

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state)
    var self = this;
    
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { keys, names } = values;
        self.setState({
          dieukhoan: keys.map(key =>names[key]),
          price: values.price
        })
      var payload = {
          'ngaytao': this.state.ngaytao,
          'fullnameHost': this.state.fullnameHost,
          'fullnameTenant': this.state.fullnameTenant,
          'cmtHost': this.state.cmtHost,
          'cmtTenant': this.state.cmtTenant,
          'address': this.state.address,
          'addressHost': this.state.addressHost,
          'addressTenant': this.state.addressTenant,
          'phoneHost': this.state.phoneHost,
          'phoneTenant': this.state.phoneTenant,
          'thoihan': this.state.thoihan,
          'dieukhoan':keys.map(key =>names[key]),
          'mota': this.state.mota,
          'dientich': this.state.dientich,
          'price': values.price,

          }
        var apiBaseUrl = "http://localhost:9000/";
        axios.post(apiBaseUrl + '/', payload)
        .then(function (response) {
          console.log(response);
          if (response.data.code === 200) {
            console.log("create contract by Host successfull");


          }
          else {
            console.log("some error ocurred", response.data.code);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  });
    
  };

  checkPrice = (rule, value, callback) => {
    if (value.number > 0) {
      return callback();
    }
    callback('Price must greater than zero!');
  };

  render() {

    // DateTime
    const { RangePicker } = DatePicker;

    // Dieukhoan, gia tien
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        label={index === 0 ? 'ĐK' : this.state}
        required={false}
        key={k}
      >
        {getFieldDecorator(`names[${k}]`, {
          validateTrigger: ['onChange', 'onBlur'],
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Vui lòng nhập điều khoản hoặc xóa trường này đi",
            },
          ],
        })(<Input placeholder="Điều khoản chung bên A hoặc bên B đề xuất" style={{ width: '80%', marginRight: 8, height: 80 }} />)}
        {keys.length > 1 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
          />
        ) : null}
      </Form.Item>
    ));
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item {...formItemLayoutWithOutLabel}>
            <Form.Item label= "NGÀY TẠO HỢP ĐỒNG">
                <DatePicker onChange={this.onChange} />
            </Form.Item>
        </Form.Item>
        
        <Form.Item {...formItemLayoutWithOutLabel} >
        <h>ĐẠI DIỆN HỢP ĐỒNG BÊN A</h>
        <Form.Item label="Họ tên chủ trọ">
        <Input placeholder="Họ tên chủ trọ" name = "fullnameHost" onChange = {this.handleChange} 
        style={{ width: '80%', marginRight: 8, height: 40 }} >
        
        </Input>
        </Form.Item>

        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel} >
        <Form.Item label="Số điện thoại:">
        <Input placeholder="số điện thoại chủ trọ" name = "phoneHost" onChange = {this.handleChange}
        style={{ width: '80%', marginRight: 8, height: 40 }}>
        
        </Input>
        </Form.Item>

        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel} >
        <Form.Item label="Số chứng minh thư:">
        <Input placeholder="CMND" name = "cmtHost" onChange = {this.handleChange}
        style={{ width: '80%', marginRight: 8, height: 40 }}>
        
        </Input>
        </Form.Item>
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel} >
        <Form.Item label="Địa chỉ thường trú:">
        <Input placeholder="Địa chỉ thường trú chủ trọ" name = "addressHost" onChange = {this.handleChange}
        style={{ width: '80%', marginRight: 8, height: 40 }}>
        
        </Input>
        </Form.Item>
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel} >
        <h>ĐẠI DIỆN HỢP ĐỒNG BÊN B</h>
        <Form.Item label="Họ tên người thuê trọ">
        <Input placeholder="Họ tên người thuê trọ" name = "fullnameTenant" onChange = {this.handleChange} 
        style={{ width: '80%', marginRight: 8, height: 40 }} >
        
        </Input>
        </Form.Item>

        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel} >
        <Form.Item label="Số điện thoại:">
        <Input placeholder="số điện thoại người thuê trọ" name = "phoneTenant" onChange = {this.handleChange}
        style={{ width: '80%', marginRight: 8, height: 40 }}>
        
        </Input>
        </Form.Item>

        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel} >
        <Form.Item label="Số chứng minh thư:">
        <Input placeholder="CMND" name = "cmtTenant" onChange = {this.handleChange}
        style={{ width: '80%', marginRight: 8, height: 40 }}>
        
        </Input>
        </Form.Item>
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel} >
        <Form.Item label="Địa chỉ thường trú:">
        <Input placeholder="Địa chỉ thường trú người thuê trọ" name = "addressTenant" onChange = {this.handleChange}
        style={{ width: '80%', marginRight: 8, height: 40 }}>
        
        </Input>
        </Form.Item>
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel} >
        <h>NỘI DUNG HỢP ĐỒNG:  </h>
        <Form.Item label = "BÊN A">
            <Form.Item label="Nơi cho thuê trọ:">
            <Input placeholder="Địa chỉ thuê trọ" name = "address" onChange = {this.handleChange}
            style={{ width: '80%', marginRight: 8, height: 40 }}>
            
            </Input>
            </Form.Item>
            <Form.Item label="Đặc điểm:">
            <Input placeholder="Đặc điểm nhà" name = "mota" onChange = {this.handleChange}
            style={{ width: '80%', marginRight: 8, height: 40 }}>
            
            </Input>
            </Form.Item>
            <Form.Item label="Diện tích cho thuê:">
            <Input placeholder="Diện tích" name = "dientich" onChange = {this.handleChange}
            style={{ width: '80%', marginRight: 8, height: 40 }}>
            
            </Input>
            </Form.Item>
            <Form.Item label="Cam kết:">
            <span>Bên A đồng ý cho bên B thuê căn nhà này với mục đích và hiện trạng 
                được nêu như trên.
            </span>
            </Form.Item>
            


        </Form.Item>

        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel} >
        <Form.Item label = "BÊN B">
            <Form.Item label="Cam kết:">
            <span>Bên B đồng ý thuê nhà bên A với toàn bộ 
                hiện trạng và mục đích sử dụng như trên.</span>
            </Form.Item>

            


        </Form.Item>

        </Form.Item>
        

        

        <Form.Item {...formItemLayoutWithOutLabel} >
            <h>THỜI HẠN HỢP ĐỒNG</h>
        <Form.Item label="Thời gian thuê nhà (theo tháng): ">
        <Input placeholder="kể từ ngày tạo hợp đồng" name = "thoihan" onChange = {this.handleChange}
        style={{ width: '80%', marginRight: 8, height: 40 }}>
        
        </Input>
        </Form.Item>
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel}>
            <h>GIÁ TIỀN CHO THUÊ:</h>
        <Form.Item label="Giá tiền thuê nhà ">
          {getFieldDecorator('price', {
            initialValue: { number: 0, currency: 'vnd' },
            rules: [{ validator: this.checkPrice }],
  
          })(<PriceInput />)}
        </Form.Item>
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel}>
            <h>ĐIỀU KHOẢN CHUNG TRONG HỢP ĐỒNG:</h>
        </Form.Item>

 
        
              {formItems}
            
          <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '80%' } }>
            <Icon type="plus" /> Thêm điều khoản
          </Button>
        </Form.Item>

        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="primary" htmlType="submit">
            Tạo hợp đồng
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(DynamicFieldSet);

// ReactDOM.render(<WrappedDynamicFieldSet />, document.getElementById('root'));
export default WrappedDynamicFieldSet;
          