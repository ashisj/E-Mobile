import React from 'react'
import { Link,withRouter } from "react-router-dom";

const CartTotals = ({total,clearCart,isLoggedIn,history,openAuthModal}) => {
    function checkout(){
        if(isLoggedIn){
            history.push('/checkout')
        } else {
            alert('You are not logged in please logged in before checkout');
            openAuthModal();
        }
    }
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                        <Link to="/">
                            <button className="btn btn-outline-danger tex-uppercase mb-3 px-5"
                                type="button"
                                onClick={clearCart}
                            >clear cart</button>
                        </Link>
                        <h5>
                            <span className="text-title">total :</span>
                            <strong>Rs. {total}</strong>
                        </h5>
                        <button className="btn btn-warning btn-lg tex-uppercase my-3 px-5"
                            onClick={checkout}
                        >
                            Check Out
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(CartTotals);