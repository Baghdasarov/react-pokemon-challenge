import React from "react";

import { Pokemons, PokemonDetails } from "containers";

export interface IRoute {
  path: string;
  exact: boolean;
  redirect?: string;
  component?: React.FC;
}

export const routes: IRoute[] = [
  {
    path: "/",
    exact: true,
    redirect: "/pokemons",
  },
  {
    path: "/pokemons",
    exact: true,
    component: Pokemons,
  },
  {
    path: "/pokemon/:id",
    exact: true,
    component: PokemonDetails,
  },
];
