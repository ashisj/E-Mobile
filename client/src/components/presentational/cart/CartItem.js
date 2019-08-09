import React from 'react'
import {incrementProduct,decrementProduct,removetProduct} from '../../../store/actions';
import {connect} from 'react-redux';

const CartItem = ({item,count,incrementProduct,decrementProduct,removetProduct}) => {
    const {pid,title,image,price} = item
    const img = image[0]
    
    return (
        <div className="row my-1 text-capitalize text-center">
            <div className="col-10 mx-auto col-lg-2">
                <img 
                    src={img} 
                    style={{width:'5rem',height:'5rem'}}
                    className="img-fluid"
                    alt="product"
                />
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">product:</span>
                {title}
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">price:</span>
                {price}
            </div>
            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                <div className="d-flex justify-content-center">
                    <div>
                        <button className="btn btn-black mx-1" 
                            disabled = {count<2}
                            onClick={() => decrementProduct(pid)}
                        >-</button>
                        <span className="btn btn-black mx-1">{count}</span>
                        <button className="btn btn-black mx-1" 
                            onClick={() => incrementProduct(pid)}
                        >+</button>
                    </div>
                </div>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <div className="cart-icon"  onClick={() => removetProduct(pid)}>
                    <i className="fas fa-trash"></i>
                </div>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <strong> item total : {price * count} </strong>
            </div>
        </div>
    )
}

export default connect(null,{incrementProduct,decrementProduct,removetProduct})(CartItem);