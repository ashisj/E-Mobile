import React, { Component } from 'react';
import {connect} from 'react-redux';
import {removeError} from '../../store/actions'
import "../../styles/modal.css";

export class Error extends Component {
    render() {
        const {error,removeError} = this.props;
        if(error){
            return (
                <div className="app-modal">
                    <div className="app-modal-content">
                        <div className="app-modal-body">
                            <div className="row h-100">
                                <h4 className="col-12 my-auto">Application Error occoured. Please try after some time</h4>
                            </div>
                        </div>
                        <div className="app-modal-footer">
                            <button onClick={removeError}>Cancel</button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

const mapStateToProps = state => ({
    error : state.error.isError,
    message: state.error.message
});

export default connect(mapStateToProps,{removeError})(Error);
