import React, { Component } from 'react';
import {connect} from 'react-redux'
import Title from '../presentational/Title';
import CartColumns from '../presentational/cart/CartColumns';
import EmptyCart from "../presentational/cart/EmptyCart";
import CartList from "../presentational/cart/CartList";
import CartTotals from '../presentational/cart/CartTotals';
import {clearCart,openAuthModal} from '../../store/actions';

class Cart extends Component {
    render() {
        const {cart,total,clearCart,isLoggedIn,openAuthModal} = this.props
        if (cart.length > 0){
            return (
                <React.Fragment>
                    <Title name="your" title="cart" />
                    <CartColumns/>
                    <CartList cart={cart}/>
                    <CartTotals total={total} clearCart={clearCart} 
                        isLoggedIn={isLoggedIn} openAuthModal={openAuthModal}
                    /> 
                </React.Fragment>
            );
        } else {
            return <EmptyCart />
        }
    }
}

const mapStateToProps = state => ({
    cart: state.cart.cartDetails,
    total: state.cart.total,
    isLoggedIn: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{clearCart,openAuthModal})(Cart)