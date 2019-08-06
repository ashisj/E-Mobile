import React,{Component} from 'react'
import "../../styles/loader.css";
import {connect} from 'react-redux';
//import PropTypes from 'prop-types';

class Loader extends Component{
    render(){
        const {loading} = this.props
        if(loading){
            return (
                <div className="loader">
                    <div className="content">   
                        <div className="spinner-grow m-auto" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            )
        } else {
            return null;
        }
        
    }
}

// Loader.propTypes = {
//     loading: PropTypes.boolean.isRequired
// }

const mapStateToProps = state => ({
    loading : state.product.loading
});

export default connect(mapStateToProps)(Loader)
