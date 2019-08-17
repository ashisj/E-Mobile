import React, { Component } from 'react';
import {connect} from 'react-redux'
import Title from '../presentational/Title';
import CartColumns from '../presentational/cart/CartColumns';
import EmptyCart from "../presentational/cart/EmptyCart";
import CartList from "../presentational/cart/CartList";
import CartTotals from '../presentational/cart/CartTotals';
import {clearCart} from '../../store/actions';

class Cart extends Component {
    render() {
        const {cart,total,clearCart} = this.props
        
        if (cart.length > 0){
            return (
                <React.Fragment>
                    <Title name="your" title="cart" />
                    <CartColumns/>
                    <CartList cart={cart}/>
                    <CartTotals total={total} clearCart={clearCart}/> 
                </React.Fragment>
            );
        } else {
            return <EmptyCart />
        }
        
    }
}

const mapStateToProps = state => ({
    cart: state.cart.cartDetails,
    total: state.cart.total
});

export default connect(mapStateToProps,{clearCart})(Cart)