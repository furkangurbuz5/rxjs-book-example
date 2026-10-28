import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { PokemonService } from './service/pokemon.service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { PokemonData } from './interface/pokemon.interface';

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
