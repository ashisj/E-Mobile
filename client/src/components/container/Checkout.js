import React, { Component } from 'react';
import Title from '../presentational/Title';
import '../../styles/checkout.css';
import {connect} from 'react-redux';
import RazorpayButton from './Order/RazorpayButton';
import DeliverInformation from './Order/DeliverInformation';
import {placeOrder} from '../../store/actions/';

class Checkout extends Component {
    render() {
        const {cart,readyForPay,placeOrder} = this.props
        const {total} = cart
        return (
            <>
                <Title name="Check" title="out" /> 
                <div className="row">
                    <div className="col-12 col-md-6 address-box">
                        <h1 className="text-center">Delivery Information</h1>
                        <DeliverInformation/>
                    </div>
                    <div className="col-12 col-md-6 text-center">
                        <h1 className="mb-5">Payment</h1>
                        {!readyForPay &&
                            <span className="text-danger">Please fill the delivery details before payment</span>
                        }
                        <div className="row">
                            <div className="col-6">
                                <h4 className="my-5">Total : {total}</h4>
                            </div>
                            <div className="col-6">
                                <RazorpayButton total={total} readyForPay={readyForPay} placeOrder={placeOrder}/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = state => ({
    cart: state.cart,
    readyForPay: state.order.readyForPay
});

export default connect(mapStateToProps,{placeOrder})(Checkout);
