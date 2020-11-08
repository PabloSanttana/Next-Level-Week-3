// @ts-ignore
import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Home from "./pages/Home";
import OrphanagesMap from "./pages/OrphanagesMap";
import Orphanage from "./pages/Orphanage";
import CreateOrphanage from "./pages/CreateOrphanage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DeleteOrphanage from "./pages/DeleteOrphanage";
import EditOrphanage from "./pages/EditOrphanage";
import RegisterUser from "./pages/RegisterUser";

import api from "./services/api";
import { authLOGOUT } from "./store/actions";
import { Store } from "./utils/interfaceReducers";

function PrivateRoutes({ component: Component, ...rest }: any) {
  const auth = useSelector((state: Store) => state.auth);
  const dispatch = useDispatch();

  api
    .get("authenticate/token")
    .then((response) => {})
    .catch((error) => {
      dispatch(authLOGOUT());
    });

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/app/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/app" exact component={OrphanagesMap} />
        <Route path="/app/login" exact component={Login} />
        <Route path="/app/users/register" exact component={RegisterUser} />
        <PrivateRoutes path="/app/Dashboard" exact component={Dashboard} />
        <PrivateRoutes
          path="/app/Dashboard/delete/:id"
          exact
          component={DeleteOrphanage}
        />
        <PrivateRoutes
          path="/app/Dashboard/edit/:id"
          exact
          component={EditOrphanage}
        />
        <PrivateRoutes
          path="/orphanages/create"
          exact
          component={CreateOrphanage}
        />
        <Route path="/orphanages/:id" exact component={Orphanage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
