import React from 'react';


class ListHome extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="thumbnail">
                        <img alt={this.props.name} src={this.props.img} style = {{width: 250}}/>
                        <div className="caption">
                            <h4>{this.props.name}</h4>
                            <p>
                                {this.props.price}
                            </p>
                            <p>
                                {this.props.address}
                            </p>
                            <p>
                                {/* <button type="button" className="btn btn-default">Thue ngay</button> */}
                                
                                <button type="button" className="btn btn-danger">Thue ngay</button>
                                
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ListHome