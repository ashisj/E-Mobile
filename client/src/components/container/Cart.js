import React, { Component } from 'react';
import {connect} from 'react-redux'
import Title from '../presentational/Title';
import CartColumns from '../presentational/cart/CartColumns';
import EmptyCart from "../presentational/cart/EmptyCart";
import CartList from "../presentational/cart/CartList";
//import CartTotals from './CartTotals';

import {getCartItems} from '../../store/actions'

class Cart extends Component {
    componentDidMount(){
        this.props.getCartItems();
    }
    render() {
        const {cart} = this.props
        
        if (cart.length > 0){
            return (
                <React.Fragment>
                    <Title name="your" title="cart" />
                    <CartColumns/>
                    <CartList cart={cart}/>
                    {/* <CartTotals value={value} history={this.props.history} /> */}
                </React.Fragment>
            );
        } else {
            return <EmptyCart />
        }
        
    }
}

const mapStateToProps = state => ({
    cart: state.cart.cartDetails
});

export default connect(mapStateToProps,{getCartItems})(Cart)