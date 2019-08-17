import React from 'react'
import {Link} from 'react-router-dom'
const NotFound = () => {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
                        <h1 className="display-3">404</h1>
                        <h1>error</h1>
                        <h2>page not found</h2>
                        <Link to="/" className="btn btn-primary">
                            return home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound;