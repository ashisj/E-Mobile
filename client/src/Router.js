import React from 'react'
import {Switch,Route} from 'react-router-dom';
import AddProduct from './pages/AddProductPage';
import Home from './pages/HomePage';
import DetailsPage from './pages/DetailsPage'
import Default from './pages/Default';
import CartPage from './pages/CartPage'

const Router = ({history}) => {
    return (
        <div className="container">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/add-product" component={AddProduct} />
                <Route exact path="/details/:id" component={DetailsPage} />
                <Route exact path="/cart" component={CartPage} />
                <Route component={Default}/>
            </Switch>    
        </div>
    )
}

export default Router
