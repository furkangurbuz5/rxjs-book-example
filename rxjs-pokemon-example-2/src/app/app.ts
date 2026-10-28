import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PokemonService, type PokemonData } from './service/pokemon.service';
import { FormsModule } from '@angular/forms';
import { toObservable } from '@angular/core/rxjs-interop';
import { catchError, filter, finalize, Observable, of, switchMap, tap } from 'rxjs';

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
  
  names = signal<string[]>([]);

  name = '';

  pokemon$ = new Observable<PokemonData[]>(); //TODO

  ngOnInit(): void {}

  onAddPokemon() {
    if (this.name) {
      this.names.update((names) => [...names, this.name]);
    }
    this.name = '';
  }
}
