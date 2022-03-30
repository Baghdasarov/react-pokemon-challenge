import axios from "axios";
import { IPokemonsList, IPokemonsDetail } from "interfaces";

axios.defaults.baseURL = "https://pokeapi.co/api/v2/";

export const getPokemonsByPage = (limit: number, offset: number) =>
  axios
    .get(`pokemon?limit=${limit}&offset=${offset}`)
    .then((response: IPokemonsList) => response.data);

export const getPokemonByUrl = (url: string) =>
  axios.get(url).then((response: IPokemonsDetail) => response.data);

export const getPokemonsList = () =>
  axios
    .get(`pokemon?limit=${10000}&offset=${0}`)
    .then((response: IPokemonsList) => response.data);
