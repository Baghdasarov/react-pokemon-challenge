import { useState } from "react";
import useRequest from "@ahooksjs/use-request";
import { useHistory } from "react-router-dom";

import { PokemonList, PokemonSearchBar } from "components";
import { getPokemonsByPage } from "api";
import { IPokemonByLimit } from "interfaces";
import { INITIAL_PAGE, PAGE_SIZE } from "./constants";

import "./pokemons.scss";

const Pokemons = () => {
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const { data, loading } = useRequest(
    () => getPokemonsByPage(PAGE_SIZE, PAGE_SIZE * currentPage),
    {
      refreshDeps: [currentPage],
    }
  );
  const { push } = useHistory();

  function handleChangePage(page: number): void {
    setCurrentPage(page);
  }

  function handleItemClick(item: IPokemonByLimit): void {
    push({
      pathname: `/pokemon/${item.name}`,
      state: { item },
    });
  }

  return (
    <div className="pokemons">
      <PokemonSearchBar handleItemClick={handleItemClick} />
      <div className="pokemons-list">
        <PokemonList
          list={data?.results || []}
          totalCount={data?.count || 0}
          pageSize={PAGE_SIZE}
          loading={loading}
          currentPage={currentPage}
          handleChangePage={handleChangePage}
          handleItemClick={handleItemClick}
        />
      </div>
    </div>
  );
};

export default Pokemons;
