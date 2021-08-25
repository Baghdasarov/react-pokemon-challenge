import React from "react";
import { Switch, Route, Redirect, RouteComponentProps } from "react-router-dom";

import { routes, IRoute } from "./config";

const render = (route: IRoute, props: RouteComponentProps) => {
  let Component: any;

  if (route.component) {
    Component = route.component;
  }

  if (route.redirect) {
    return <Redirect to={route.redirect} />;
  }
  return <Component {...props} />;
};

const Routes = () => {
  return (
    <Switch>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          render={(props: RouteComponentProps) => render(route, props)}
        />
      ))}
      <Route path="/404" render={() => <h1>Page Not Found</h1>} />
      <Redirect from="*" to="/404" />
    </Switch>
  );
};

export default Routes;
