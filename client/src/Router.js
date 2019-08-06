import React from 'react'
import {Switch,Route} from 'react-router-dom';
import AddProduct from './pages/AddProductPage';
import Home from './pages/HomePage';
import DetailsPage from './pages/DetailsPage'
import Default from './pages/Default';

const Router = ({history}) => {
    return (
        <div className="container">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/add-product" component={AddProduct} />
                <Route exact path="/details/:id" component={DetailsPage} />
                <Route component={Default}/>
            </Switch>    
        </div>
    )
}

export default Router
