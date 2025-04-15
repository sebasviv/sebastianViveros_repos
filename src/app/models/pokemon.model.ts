export interface IPokemonCharacter {
  imageUrl: string;
  name: string;
  id: number;
  extraData: IPokemonData;
}

export interface IPokemonData  {
  type: string;
  weight: number;
  sprites: PokemonSpritesType;
  moves: PokemonMovesType[];
}


export type PokemonSpritesType = {
  front_default: string;
  back_default: string;
  front_shiny: string;
  back_shiny: string;
}

export type PokemonMovesType = {
  move: {
    name: string;
  };
}
