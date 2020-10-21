import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./ui/Home";
import Stages from "./ui/Stages";
import AppBar from "./components/AppBar";
import HomeViewModel from "./view-models/HomeViewModel";
import StagesViewModel from "./view-models/StagesViewModel";
import LoginViewModel from "./view-models/LoginViewModel";
import PrivateRoute from "./routes/PrivateRoute";
import Login from "./ui/Login";
import AppBarViewModel from "./view-models/AppBarViewModel";

export default function App() {
  const homeViewModel = new HomeViewModel();
  const stagesViewModel = new StagesViewModel();
  const loginViewModel = new LoginViewModel();
  const appBarViewModel = new AppBarViewModel();
  return (
    <Router>
      <div className="App">
        {!!loginViewModel.isLogin() && <AppBar viewModel={appBarViewModel} />}
        <Switch>
          <Route path="/signin" exact>
            <Login loginViewModel={loginViewModel} />
          </Route>
          <PrivateRoute
            component={Home}
            viewModel={homeViewModel}
            loginViewModel={loginViewModel}
            path="/"
            exact
          />
          <PrivateRoute
            component={Stages}
            loginViewModel={loginViewModel}
            viewModel={stagesViewModel}
            path="/:tripId/stages"
            exact
          />
        </Switch>
      </div>
    </Router>
  );
}
