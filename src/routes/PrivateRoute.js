import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ component: Component, loginViewModel, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        loginViewModel.isLogin() ? (
          <Component viewModel={rest.viewModel} {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};
