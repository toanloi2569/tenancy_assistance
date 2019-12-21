import React from 'react';
import {connect} from 'react-redux';
import {selectHome} from './action/index';
import {bindActionCreators} from 'redux';


class Test extends React.Component{

    showlist(){
        let listItems = this.props.danhsach.map(
            (eachDS)=>{
                return(
                    <li key={eachDS.id} >{eachDS.name}</li>

                );
            }
        )
        return listItems;

    }
    render(){
        return(
            <div>
                {this.showlist()}
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        danhsach: state.danhsach
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({selectHome: selectHome }, dispatch)
    
}

let Testabc = connect(mapStateToProps,mapDispatchToProps)(Test)
export default Testabc;