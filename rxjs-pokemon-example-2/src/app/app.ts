import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService, type PokemonData } from './service/pokemon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'app.html',
  styleUrl: 'app.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App implements OnInit {
  private pokemonService = inject(PokemonService);

  protected readonly isLoading = signal(true);
  error = signal<string | null>(null);
  pokemonData = signal<PokemonData[]>([]);

  ngOnInit(): void {
    const ids = [1, 4, 7, 25]; // bulbasaur, charmander, squirtle, pikachu

    this.pokemonService.fetchPokemonWithSpecies(ids).subscribe({
      next: (data) => {
        this.pokemonData.set(data.filter(d => d.pokemon && d.species) as PokemonData[]);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(`Failed to load Pokemon: ${err.message}`);
        this.isLoading.set(false);
      }
    });
  }
}