import React from 'react';
import Search from './Search';
import 'antd/dist/antd.css';
import '../index.css';
import { Card } from 'antd';
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

const priceOptions = ['<5tr', '5tr-10tr', '>10tr'];
const defaultCheckPrice = ['<5tr'];

const squareOptions = ['<10m2', '10m2-50m2',">50m2"];
const defaultCheckSquare = ['10m2'];

class FilterHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedListPrice: defaultCheckPrice,
            indeterminatePrice: true,
            checkAllPrice: false,
            checkedListSquare : defaultCheckSquare,
            indeterminateSquare: true,
            checkAllSquare: false,
        };


    }
    onChangePrice = checkedListPrice => {
        this.setState({
            checkedListPrice,
            indeterminatePrice: !!checkedListPrice.length && checkedListPrice.length < priceOptions.length,
            checkAllPrice: checkedListPrice.length === priceOptions.length,
        });
    };
    onChangeSquare = checkedListSquare => {
        this.setState({
            checkedListSquare,
            indeterminateSquare: !!checkedListSquare.length && checkedListSquare.length < squareOptions.length,
            checkAllSquare: checkedListSquare.length === squareOptions.length,
        });
    };

    onCheckAllChangePrice = e => {
        this.setState({
            checkedListPrice: e.target.checked ? priceOptions : [],
            indeterminatePrice: false,
            checkAllPrice: e.target.checked,
        });
    
    };
    onCheckAllChangeSquare = e => {
        this.setState({
            checkedListSquare: e.target.checked ? squareOptions : [],
            indeterminateSquare: false,
            checkAllSquare: e.target.checked,
        });
    
    };

    render() {
        return (
            <div className="container">
                <Card title="Tìm kiếm theo các hạng mục "  >
                <p> 
                    <label>Address:</label>
                    <Search />
                </p>
                <p>
                    <label>Price</label>
                    <div>
                    <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                    <Checkbox
                        indeterminatePrice={this.state.indeterminatePrice}
                        onChange={this.onCheckAllChangePrice}
                        checked={this.state.checkAllPrice}
                    >
                        Check all price
                    </Checkbox>
                        </div>
                        <br />
                        <CheckboxGroup
                            options={priceOptions}
                            value={this.state.checkedListPrice}
                            onChange={this.onChangePrice}
                        />
                    </div>
                </p>
                <p>
                    <label>Square</label>
                    <div>
                    <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                    <Checkbox
                        indeterminateSquare={this.state.indeterminateSquare}
                        onChange={this.onCheckAllChangeSquare}
                        checked={this.state.checkAllSquare}
                    >
                        Check all square
                    </Checkbox>
                        </div>
                        <br />
                        <CheckboxGroup
                            options={squareOptions}
                            value={this.state.checkedListSquare}
                            onChange={this.onChangeSquare}
                        />
                    </div>
                </p> 
                </Card>

            </div>
        )
    }
}
export default FilterHome;