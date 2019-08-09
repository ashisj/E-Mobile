import React from 'react';
import styled from 'styled-components';
import { ButtonContainer } from './Button';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { closeProductModal } from '../../store/actions'

const ProductModal = ({modal,details,closeProductModal}) => {
    function closeModal() {
        closeProductModal()
    }
    if(modal){
        const {title,price,image} = details
        return (
            <ModalContainer>
                <div className='container'>
                    <div className='row'>
                        <div id='modal' 
                            className='col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5'>
                            <h5 className="text-success">item added to the cart</h5>
                            <img src={image[0]} className='img-fluid' alt='product' />
                            <h5>{title}</h5>
                            <h5 className='text-muted'>price: Rs. {price}</h5>
                            <Link to='/'>
                                <ButtonContainer
                                    onClick={() => closeModal()}
                                >
                                    store
                                </ButtonContainer>
                            </Link> 
                            <Link to='/cart'>
                                <ButtonContainer
                                    cart
                                    onClick={() => closeModal()}
                                >
                                    go to cart
                                </ButtonContainer>
                            </Link>
                        </div>
                    </div>
                </div>
            </ModalContainer>
        )
    } else {
        return false;
    }
}

const mapStateToProps = state => ({
    modal:state.product.productModal,
    details : state.product.details
});

export default connect(mapStateToProps,{closeProductModal})(ProductModal);

const ModalContainer = styled.div`
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    #modal{
        background: var(--mainWhite);
    }

`