import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { PokemonDetails, Pokemons } from "../containers";

const Routes = () => {
  return (
    <Switch>
      <Route path={["/", "/pokemons"]} exact={true} component={Pokemons} />
      <Route path="/pokemon/:id" exact={true} component={PokemonDetails} />

      <Route path="/404" render={() => <h1>Page Not Found</h1>} />
      <Redirect from="*" to="/404" />
    </Switch>
  );
};

export default Routes;
