import React from 'react'
import { connect } from "react-redux";
import styled from 'styled-components';
import Register from '../container/auth/Register';
import Login from '../container/auth/Login';
import '../../styles/auth.css';
import {closeAuthModal} from '../../store/actions';

function AuthModal({auth,closeAuthModal}) {
    const {isOpenAuthModal} = auth;
    if(isOpenAuthModal){
        return (
            <ModalContainer>
                <div className='container'>
                    <div className='row'>
                        <div id='modal' 
                            className='col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5'>
                                    <span className="close-modal" onClick={closeAuthModal}>x</span>

                                    <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
                                        <li className="nav-item">
                                        <a className="nav-link active" data-toggle="tab" href="#login" role="tab">Login</a>
                                        </li>
                                        <li className="nav-item">
                                        <a className="nav-link" data-toggle="tab" href="#register" role="tab">Register</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <Login/>
                                        <Register/>
                                    </div>
                                
                        </div>
                    </div>
                </div>
            </ModalContainer>
        )
    } else {
        return null
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps,{closeAuthModal})(AuthModal);


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