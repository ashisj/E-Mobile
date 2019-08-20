import React from 'react'
import {Link} from 'react-router-dom'
const UnAuthorized = () => {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
                        <h1 className="display-3">401</h1>
                        <h1 className="text-danger">UnAuthorized/UnAuthenticated</h1>
                        <h2>You are not authorized to access this page</h2>
                        <Link to="/" className="btn btn-primary">
                            return home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UnAuthorized;