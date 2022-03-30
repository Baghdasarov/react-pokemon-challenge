import { useEffect, useState } from "react";
import useRequest from "@ahooksjs/use-request";

import { getPokemonsList } from "api";
import { INameUrl, IPokemonByLimit } from "interfaces";

import "./pokemonSearchBar.scss";

interface IPokemonSearchBar {
  handleItemClick: (item: IPokemonByLimit) => void;
}

const PokemonSearchBar = ({ handleItemClick }: IPokemonSearchBar) => {
  const [pokemons, setPokemons] = useState<INameUrl[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const { data } = useRequest(() => getPokemonsList());

  useEffect(() => {
    if (searchValue.length <= 3 || !data) {
      setPokemons([]);
      return;
    }

    const pokemons = data.results.filter((item: INameUrl) => {
      return item.name.toLowerCase().includes(searchValue.toLowerCase());
    });

    setPokemons(pokemons);
  }, [searchValue]);

  function handleChangeSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  return (
    <div className="search-content">
      <div className="search-box">
        <input
          type="text"
          name="search"
          value={searchValue}
          onChange={handleChangeSearch}
          placeholder="Search"
        />
      </div>
      {pokemons.length > 0 ? (
        <div className="search-result">
          {pokemons.map((item: { name: string; url: string }) => (
            <>
              <div className="item" onClick={() => handleItemClick(item)}>
                {item.name}: {item.url}
              </div>
            </>
          ))}
        </div>
      ) : searchValue.length > 3 ? (
        <div className="search-result">No result</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default PokemonSearchBar;
