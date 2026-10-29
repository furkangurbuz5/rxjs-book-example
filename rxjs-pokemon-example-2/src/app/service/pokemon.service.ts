import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon, PokemonResponse, PokemonData, Species } from '../interface/pokemon.interface';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private http = inject(HttpClient);

  fetchPokemonById(id: number): Observable<Pokemon> {
    return this.http.get<PokemonResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
      map((res: PokemonResponse) => ({
        id: res.id,
        name: res.name,
        types: res.types.map((t: any) => t.type.name),
        sprite: res.sprites.other['official-artwork'].front_default,
      })),
    );
  }

  fetchPokemonByName(name: string): Observable<Pokemon> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`).pipe(
      map((res: any) => ({
        id: res.id,
        name: res.name,
        types: res.types.map((t: any) => t.type.name),
        sprite: res.sprites.other['official-artwork'].front_default,
      })),
    );
  }

  fetchSpeciesById(id: number): Observable<Species> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`).pipe(
      map((res: any) => ({
        id: res.id,
        flavorText: res.flavor_text_entries
          .find((e: any) => e.language.name === 'en')
          ?.flavor_text.replace(/\n|\f/g, ' '),
      })),
    );
  }

  fetchSpeciesByName(name: string): Observable<Species> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`).pipe(
      map((res: any) => ({
        id: res.id,
        flavorText: res.flavor_text_entries
          .find((e: any) => e.language.name === 'en')
          ?.flavor_text.replace(/\n|\f/g, ' '),
      })),
    );
  }

  fetchPokemonWithSpeciesById(ids: number[]): Observable<PokemonData[]> {
    return new Observable<PokemonData[]>(); //TODO
  }

  fetchPokemonWithSpeciesByName(names: string[]): Observable<PokemonData[]> {
    return new Observable<PokemonData[]>(); //TODO
  }
}
