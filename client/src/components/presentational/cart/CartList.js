import React from 'react';
import CartItem from "./CartItem";

export default function CartList({cart}) {
    return (
        <div className="container-fluid">
           {cart.map(item => (              
                <CartItem key={item.pid} item={item} count={item.count}/>
           ))}
        </div>
    )
}
