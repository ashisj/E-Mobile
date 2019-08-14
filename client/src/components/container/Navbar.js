import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {ButtonContainer} from '../presentational/Button';
import {openAuthModal,logout} from '../../store/actions';
import {connect} from 'react-redux'

class Navbar extends Component {
    render() {
        const {isAuthenticated,user} = this.props;
        let userDetails;
        if(isAuthenticated){
            userDetails = (
                <>
                    <li className='nav-item'>
                        <span className="user-details">{user.name ? user.name : ''}</span>
                    </li>
                    <li className='nav-item'>
                        <ButtonContainer onClick={this.props.logout}>
                            Logout
                        </ButtonContainer>
                    </li>
                </>
            )
        } else {
            userDetails = (
                <>
                    <li className='nav-item'>
                        <span className="user-details">Guest</span>
                    </li>
                    <li className='nav-item'>
                        <ButtonContainer onClick={this.props.openAuthModal}>
                            Login & Registration
                        </ButtonContainer>
                    </li>
                </>
            )
        }

        return (
            <nav className='navbar navbar-expand-md bg-dark navbar-dark'>
                {/* Brand */}
                <Link className='navbar-brand text-title' to='/'>mobile app</Link>

                {/* <!-- Toggler/collapsibe Button --> */}
                <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#collapsibleNavbar'>
                    <span className='navbar-toggler-icon'></span>
                </button>

                {/* <!-- Navbar links --> */}
                <div className='collapse navbar-collapse' id='collapsibleNavbar'>
                    <ul className='navbar-nav mr-auto'>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/add-product'>add product</Link>
                        </li>
                    </ul>
                    <ul className='navbar-nav'>
                        {userDetails}
                        <li className='nav-item'>
                            <Link to='/cart'>
                                <ButtonContainer>
                                    <span className='mr-2'>
                                        <i className='fas fa-cart-plus'/>
                                    </span>
                                    cart
                                </ButtonContainer>
                            </Link>
                        </li>
                    </ul>
                </div> 
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps,{openAuthModal,logout})(Navbar)
