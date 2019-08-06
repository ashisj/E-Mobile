import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {ButtonContainer} from '../presentational/Button'
class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                {/* Brand */}
                <Link className="navbar-brand text-title" to="/">mobile app</Link>

                {/* <!-- Toggler/collapsibe Button --> */}
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* <!-- Navbar links --> */}
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/add-product">add product</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <ButtonContainer>
                                <span className="mr-2">
                                    <i className="fas fa-cart-plus"/>
                                </span>
                                my cart
                            </ButtonContainer>
                        </li>
                    </ul>
                </div> 
            </nav>
        )
    }
}

export default Navbar
