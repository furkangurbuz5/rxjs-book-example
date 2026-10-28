import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  sprite: string;
}

interface Species {
  id: number;
  flavorText: string;
}

interface PokemonData {
  pokemon: Pokemon;
  species: Species;
}

export type { PokemonData };

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private http = inject(HttpClient);

  fetchPokemon(id: number): Observable<Pokemon> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${id}`).pipe(
      map((res: any) => ({
        id: res.id,
        name: res.name,
        types: res.types.map((t: any) => t.type.name),
        sprite: res.sprites.other['official-artwork'].front_default
      })),
      catchError(err => {
        console.error(`Error fetching Pokemon ${id}:`, err.message);
        return of(null as any);
      })
    );
  }

  fetchSpecies(id: number): Observable<Species> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`).pipe(
      map((res: any) => ({
        id: res.id,
        flavorText: res.flavor_text_entries
          .find((e: any) => e.language.name === 'en')
          ?.flavor_text.replace(/\n|\f/g, ' ')
      })),
      catchError(err => {
        console.error(`Error fetching species for ${id}:`, err.message);
        return of(null as any);
      })
    );
  }

  // Uses forkJoin to fetch Pokemon + species in parallel
  fetchPokemonWithSpecies(ids: number[]): Observable<PokemonData[]> {
    return forkJoin(
      ids.map(id => forkJoin({
        pokemon: this.fetchPokemon(id),
        species: this.fetchSpecies(id)
      }))
    );
  }
}