import useRequest from "@ahooksjs/use-request";
import { useLocation, NavLink } from "react-router-dom";

import { getPokemonByUrl } from "api";
import {
  IPokemonStats,
  IPokemonTypes,
  IPokemonVersionGroupDetails,
  IPokemonMoves,
} from "interfaces";

import "./pokemonDetails.scss";

interface ILocationItem {
  state: {
    item: {
      url: string;
    };
  };
}

const renderLink = (link: string) => {
  return <a href={link}>{link}</a>;
};

const PokemonDetails = () => {
  const { state } = useLocation() as ILocationItem;
  const { data, loading } = useRequest(() => getPokemonByUrl(state.item.url));

  return (
    <div className="pokemonDetails">
      {loading ? (
        <h1>Loading...</h1>
      ) : data ? (
        <>
          <div className="main-info-content">
            <div className="nav-content">
              <NavLink to="/" className="nav-link">
                Go to List
              </NavLink>
            </div>
            <h2 className="title">Main information about {data.name}</h2>
            <div>
              <img src={data.sprites.front_default} alt="front_default" />
              <img src={data.sprites.back_default} alt="front_default" />
            </div>
            <div>
              <b>Weight:</b> {data.weight}
            </div>
          </div>

          <div className="full-info">
            <ul className="pokemonDetails-species">
              Species
              <li>
                <b>Name:</b> {data.species.name}
              </li>
              <li>
                <b>URL:</b> {renderLink(data.species.url || "")}
              </li>
            </ul>
            <div className="pokemonDetails-stats">
              Stats
              {data.stats.map((item: IPokemonStats, index: number) => (
                <ul key={index + "state"}>
                  <li>
                    <b>Base stat: </b>
                    {item.base_stat}
                  </li>
                  <li>
                    <b>Effort: </b>
                    {item.effort}
                  </li>
                  <li>
                    <b>Name: </b>
                    {item.stat.name}
                  </li>
                  <li>
                    <b>URL: </b>
                    {renderLink(item.stat.url)}
                  </li>
                </ul>
              ))}
            </div>
            <ul className="pokemonDetails-types">
              Types
              {data.types.map((item: IPokemonTypes, index: number) => (
                <div key={index + "types"}>
                  <li>
                    <b>Slot:</b> {item.slot}
                  </li>
                  <li>
                    <b>Name:</b> {item.type.name}
                  </li>
                  <li>
                    <b>URL: </b>
                    {renderLink(item.type.url)}
                  </li>
                </div>
              ))}
            </ul>
            <div className="pokemonDetails-moves">
              Moves
              {data.moves.map((item: IPokemonMoves, index: number) => (
                <ul className="moves-start" key={index + "moves"}>
                  <span>General</span>
                  <li>
                    <b>Name:</b> {item.move.name}
                  </li>
                  <li>
                    <b>Url:</b> {renderLink(item.move.url)}
                  </li>
                  <ul>
                    <span>Version group details</span>
                    {item.version_group_details.map(
                      (subItem: IPokemonVersionGroupDetails, key: number) => (
                        <div key={key + "version_group_details"}>
                          <li>
                            <b>Level learned at:</b> {subItem.level_learned_at}
                          </li>
                          <ul>
                            <span>Move learn method</span>
                            <li>
                              <b>Name:</b> {subItem.move_learn_method.name}
                            </li>
                            <li>
                              <b>URL:</b>{" "}
                              {renderLink(subItem.move_learn_method.url)}
                            </li>
                          </ul>
                          <ul>
                            <span>Version group</span>
                            <li>
                              <b>Name:</b> {subItem.version_group.name}
                            </li>
                            <li>
                              <b>URL:</b>{" "}
                              {renderLink(subItem.version_group.url)}
                            </li>
                          </ul>
                        </div>
                      )
                    )}
                  </ul>
                </ul>
              ))}
            </div>
          </div>
        </>
      ) : (
        <h1>No result...</h1>
      )}
    </div>
  );
};

export default PokemonDetails;
