export interface PokemonResponse {
  id: number;
  name: string;
  types: string[];
  sprites: Sprites;
}

export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  sprite: string;
}

export interface Species {
  id: number;
  flavorText: string;
}

interface Sprites {
  other: Other;
}

interface Other {
  'official-artwork': OfficialArtwork;
}

interface OfficialArtwork {
  front_default: string;
}

export interface PokemonData {
  pokemon: Pokemon;
  species: Species;
}
