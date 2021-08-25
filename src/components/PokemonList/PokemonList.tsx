import { Pagination } from "components";

import { IPokemonByLimit } from "interfaces";

import "./pokemonList.scss";

interface IPokemonList {
  list: IPokemonByLimit[];
  loading: boolean;
  pageSize: number;
  totalCount: number;
  currentPage: number;
  handleChangePage: (page: number) => void;
  handleItemClick: (item: IPokemonByLimit) => void;
}

const PokemonList = ({
  list,
  loading,
  pageSize,
  totalCount,
  currentPage,
  handleChangePage,
  handleItemClick,
}: IPokemonList) => {
  return (
    <div className="itemList">
      <div className="itemList-table-grid">
        <div className="itemList-header">
          <div className="title"> Item Name </div>
          <div className="title last"> URL </div>
        </div>
        {loading ? (
          <h1 className="itemList-loading">Loading...</h1>
        ) : (
          list.map((item, idx) => (
            <div
              key={item.name + idx}
              className="item"
              onClick={() => handleItemClick(item)}
            >
              <div className="text-capitalize">{item.name}</div>
              <div>{item.url}</div>
            </div>
          ))
        )}
      </div>
      <Pagination
        pageSize={pageSize}
        total={totalCount - pageSize || 0}
        current={currentPage}
        onChange={handleChangePage}
      />
    </div>
  );
};

export default PokemonList;
