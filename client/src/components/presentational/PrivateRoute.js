import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
//import PropTypes from "prop-types";

const PrivateRoute = ({ component: Component, authenticate, ...rest }) => (
  <Route
    {...rest}
    render={props =>
        authenticate ? (
        <Component {...props} />
      ) : (
        <Redirect to="/unauthorized" />
      )
    }
  />
);

// AdminRoute.propTypes = {
//   authorizrd: PropTypes.Boolean.isRequired
// };

const mapStateToProps = state => ({
  authenticate: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);
