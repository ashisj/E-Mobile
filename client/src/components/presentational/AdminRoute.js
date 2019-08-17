import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const AdminRoute = ({ component: Component, authorizrd, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authorizrd ? (
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
  authorizrd : state.auth.user.isAdmin
});

export default connect(mapStateToProps)(AdminRoute);
