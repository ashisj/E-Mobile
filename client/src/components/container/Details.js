import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import {setDetails,getDetails} from '../../store/actions'
//import { ButtonContainer } from "./Button";

class Details extends Component {
    componentDidMount(){
        const id = this.props.history.location.pathname.split('/').pop();
        if(this.props.products.length){
            this.props.setDetails(id);
        } else {
            this.props.getDetails(id);
        }
    }
    
    render() {
        const {title,image,price,company,info} = this.props.details
        let displayImage = image ? image[0] : '';

        return (
            <div className="container py-5">
                {/* title */}
                <div className="row">
                    <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                            <h1>{title}</h1>
                    </div>
                </div>
                {/* end title */}
                
                {/* product info */}
                <div className="row">
                    {/* product image */}
                    <div className="col-10 mx-auto col-md-6">
                        <img src={displayImage} alt="product" className="img-fluid"/>
                    </div>
                    {/* product text */}
                    <div className="col-10 mx-auto col-md-6 text-capitalize">
                        <h2>model: {title}</h2>
                        <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                            made by: 
                            <span className="text-uppercase">
                                {company}
                            </span>
                        </h4>
                        <h4 className="text-blue">
                            <strong>
                                price: <span>Rs.</span>
                                {price}
                            </strong>
                        </h4>
                        <p className="text-capitalize font-weight-bold-mt-3 mb-0">
                            some info about product
                        </p>
                        <p className="text-muted lead">
                            {info}
                        </p>

                        {/* buttons */}
                        {/* <Link to="/">
                            <ButtonContainer>
                                back to products
                            </ButtonContainer>
                        </Link> */}
                        
                        {/* <ButtonContainer 
                            cart
                            disabled={inCart?true:false}
                            onClick = {()=>{
                                value.addToCart(id);
                                value.openModal(id);
                            }}
                        >
                            {inCart ? "inCart" : "add to cart"}
                        </ButtonContainer> */}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    details: state.product.details,
    products: state.product.products
});

export default withRouter(connect(mapStateToProps,{setDetails,getDetails})(Details));