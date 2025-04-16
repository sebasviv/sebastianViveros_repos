import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IPokemonCharacter } from '../../models/pokemon.model';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  imports: [CardModule, ButtonModule, PokemonCardComponent, CommonModule],
  standalone: true,
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  pokemons: IPokemonCharacter[] = [];

  ngOnInit() {
    this.handleGetPokemonsLocalStorage();
  }

  handleGetPokemonsLocalStorage() {
    const stored = localStorage.getItem('myPokemons');
    const pokemonsLocalStorage: any[] = stored ? JSON.parse(stored) : [];
    const pokemonsData = pokemonsLocalStorage.map((pokemon) => {
      return {
        imageUrl: pokemon.extraData.sprites.front_default,
        name: pokemon.name,
        id: pokemon.id,
        extraData: pokemon.extraData,
      };
    });

    this.pokemons = pokemonsData;
  }

  handleClearFavorites() {
    localStorage.removeItem('myPokemons');
    this.pokemons = [];
  }
}
