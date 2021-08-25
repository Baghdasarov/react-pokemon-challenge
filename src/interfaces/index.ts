export interface INameUrl {
  name: string;
  url: string;
}

export interface IPokemonByLimit extends INameUrl {}
export interface IPokemonStat extends INameUrl {}
export interface IPokemonType extends INameUrl {}
export interface IPokemonMove extends INameUrl {}

export interface IPokemonStats {
  base_stat: number;
  effort: number;
  stat: IPokemonStat;
}

export interface IPokemonSprites {
  back_default: string;
  front_default: string;
}

export interface IPokemonTypes {
  slot: number;
  type: IPokemonType;
}

export interface IPokemonVersionGroupDetails {
  level_learned_at: number;
  move_learn_method: INameUrl;
  version_group: INameUrl;
}

export interface IPokemonMoves {
  move: IPokemonMove;
  version_group_details: IPokemonVersionGroupDetails[];
}

export interface IPokemonsList {
  data: {
    count: number;
    next: string;
    previous: string;
    results: IPokemonByLimit[];
  };
}

export interface IPokemonsDetail {
  data: {
    name: string;
    sprites: IPokemonSprites;
    weight: string;
    species: INameUrl;
    stats: IPokemonStats[];
    types: IPokemonTypes[];
    moves: IPokemonMoves[];
  };
}
