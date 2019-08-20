import React from 'react'
import {Switch,Route} from 'react-router-dom';
import AddProduct from './pages/AddProductPage';
import Home from './pages/HomePage';
import DetailsPage from './pages/DetailsPage'
import NotFound from './pages/NotFoundPage';
import CartPage from './pages/CartPage';
import UnAuthorized from './pages/UnAuthorizedPage';
import Checkout from './pages/CheckoutPage';
import AdminRoute from './components/presentational/AdminRoute';
import PrivateRoute from './components/presentational/PrivateRoute';
const Router = ({history}) => {
    return (
        <div className="container">
            <Switch>
                <Route exact path="/" component={Home} />
                <AdminRoute exact path="/add-product" component={AddProduct} />
                <Route exact path="/details/:id" component={DetailsPage} />
                <Route exact path="/cart" component={CartPage} />
                <Route exact path="/unauthorized" component={UnAuthorized} />
                <PrivateRoute exact path="/checkout" component={Checkout} />
                <Route component={NotFound}/>
            </Switch>    
        </div>
    )
}

export default Router
