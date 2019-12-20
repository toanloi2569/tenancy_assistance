
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../index.css';
import { Form, Input, Icon, Button } from 'antd';
import { DatePicker } from 'antd';
import PriceInput from './PriceInput';
import ShowContract from './ShowContract';
// import ShowContract from './ShowContract';



let id = 0;

class DynamicFieldSet extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      dieukhoan: [],
      time : [],
      hoten: '',
      hotenbenB: '',
      price : [],
      phone: '',
      address: '',
      socmt:'',
      socmtbenB:'',
      square: '',


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
  onChange(value, dateString) {
    // console.log('Selected Time: ', value);
    // console.log('Formatted Selected Time: ', dateString);
    this.setState({
      time: dateString
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
        // console.log('Received values of form: ', values);
        // console.log('Merged values:', keys.map(key => names[key]));
        // console.log(keys.map(key => names[key]))
        // console.log(values)
        self.setState({
          dieukhoan: keys.map(key =>names[key]),
          price: values.price
        })
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
        label={index === 0 ? 'Điều khoản' : ''}
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
        })(<Input placeholder="Điều khoản hợp đồng" style={{ width: '80%', marginRight: 8, height: 80 }} />)}
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
        {formItems}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="dashed" onClick={this.add} style={{ width: '80%' } }>
            <Icon type="plus" /> Thêm điều khoản
          </Button>
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel}>
          {/* <Input placeholder={this.state.dieukhoan}>
        
          </Input> */}
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            placeholder={['Start Time', 'End Time']}
            onChange={this.onChange}
            style={{ width: '80%' } }
          />
        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel} >
        <Form.Item label="Ho ten">
        <Input placeholder="Ho ten chu tro" name = "hoten" onChange = {this.handleChange} 
        style={{ width: '80%', marginRight: 8, height: 50 }} >
        
        </Input>
        </Form.Item>

        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel} >
        <Form.Item label="Phone">
        <Input placeholder="So dien thoai" name = "phone" onChange = {this.handleChange}
        style={{ width: '80%', marginRight: 8, height: 50 }}>
        
        </Input>
        </Form.Item>

        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel} >
        <Form.Item label="CMT:">
        <Input placeholder="so cmt" name = "socmt" onChange = {this.handleChange}
        style={{ width: '80%', marginRight: 8, height: 50 }}>
        
        </Input>
        </Form.Item>
        </Form.Item>

        <Form.Item {...formItemLayoutWithOutLabel} >
        <Form.Item label="Square ( m2 ) : ">
        <Input placeholder="dien tich" name = "square" onChange = {this.handleChange}
        style={{ width: '80%', marginRight: 8, height: 50 }}>
        
        </Input>
        </Form.Item>
  


        </Form.Item>

        <Form.Item {...formItemLayoutWithOutLabel} >
        <Form.Item label="Address">
        <Input placeholder="Dia chi nha" name = "address" onChange = {this.handleChange}
        style={{ width: '80%', marginRight: 8, height: 50 }}>
        
        </Input>
        </Form.Item>
  


        </Form.Item>
        <Form.Item {...formItemLayoutWithOutLabel}>
        <Form.Item label="Price">
          {getFieldDecorator('price', {
            initialValue: { number: 0, currency: 'vnd' },
            rules: [{ validator: this.checkPrice }],
  
          })(<PriceInput />)}
        </Form.Item>
        </Form.Item>
          <Form.Item {...formItemLayoutWithOutLabel}>

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
          