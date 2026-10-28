import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PokemonService, type PokemonData } from './service/pokemon.service';
import { FormBuilder, FormsModule } from '@angular/forms';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, AsyncPipe],
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private pokemonService = inject(PokemonService);

  protected readonly isLoading = signal(true);
  error = signal<string | null>(null);
  pokemonDataById = signal<PokemonData[]>([]);
  pokemonDataByName = signal<PokemonData[]>([]);
  names = signal<string[]>([]);

  name = '';

  names$ = toObservable(this.names).pipe(
    tap(console.log),
    filter((names) => names.length !== 0),
    switchMap((names) => this.pokemonService.fetchPokemonWithSpeciesByName(names)),
  );

  ngOnInit(): void {
    const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 150, 151];

    this.pokemonService.fetchPokemonWithSpeciesById(ids).subscribe((data) => {
      this.pokemonDataById.set(data.filter((d) => d.pokemon && d.species));
      this.isLoading.set(false);
    });
    this.pokemonService.fetchPokemonWithSpeciesByName(this.names()).subscribe((data) => {
      this.pokemonDataByName.set(data.filter((d) => d.pokemon && d.species));
      this.isLoading.set(false);
    });
  }

  onAddPokemon() {
    this.names.update((names) => [...names, this.name]);
  }
}
