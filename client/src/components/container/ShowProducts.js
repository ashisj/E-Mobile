import React, { Component } from 'react';
import {connect} from 'react-redux';
//import PropTypes from 'prop-types';
import Product from '../presentational/Product.js'
//import {getProducts} from '../../store/actions';
import Title from '../presentational/Title';

class ShowProducts extends Component {

    // componentDidMount(){
    //     this.props.getProducts()
    // }

    
    render() {
        const {products} = this.props
        return (
            <>
                <div className="py-5">
                    <div className="container">
                    <Title name="our" title="products"/>
                        <div className="row">
                            {products.map(product => (
                                <Product product={product} key={product._id} inCart={product.inCart} />
                            ))}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

/*
ShowProducts.propTypes = {
    getProducts:PropTypes.func.isRequired
}
*/
const mapStateToProps = state => ({
    products : state.product.products
});

export default connect(mapStateToProps)(ShowProducts)
