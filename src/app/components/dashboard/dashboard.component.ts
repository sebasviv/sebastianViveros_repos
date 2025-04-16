import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { IPokemonCharacter } from '../../models/pokemon.model';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { PaginatorModule } from 'primeng/paginator';
import { totalPokemonCount } from '../../shared/signals/pokemon-signals';
@Component({
  selector: 'app-dashboard',
  imports: [
    InputTextModule,
    FormsModule,
    CardModule,
    ButtonModule,
    PokemonCardComponent,
    CommonModule,
    PaginatorModule,
  ],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  inputCharacter: string = '';
  pokemonsList: IPokemonCharacter[] = [];
  pokemonFavorites: IPokemonCharacter[] = [];
  limit: number = 4;
  page: number = 1;
  private readonly pokemonService = inject(PokemonService);
  pokemonSelected: IPokemonCharacter | null = null;
  totalPokemons: number = 0;

  ngOnInit() {
    this.handleGetAllPokemons();
    this.handleGetPokemonsLocalStorage();
  }

  handleGetAllPokemons() {
    const offset = this.limit * (this.page - 1);
    this.pokemonService.getAllPokemonCharacters(this.limit, offset).subscribe({
      next: (data) => {
        const requests = data.results.map((pokemon: any) =>
          this.pokemonService.getPokemonCharacter(pokemon.name)
        );

        this.totalPokemons = data.count;
        totalPokemonCount.set(this.totalPokemons);

        forkJoin(requests).subscribe((responses: any) => {
          this.pokemonsList = responses.map((pokemonInfo: any) => ({
            imageUrl: pokemonInfo.sprites.front_default,
            name: pokemonInfo.name,
            id: pokemonInfo.id,
            extraData: {
              type: pokemonInfo.types[0].type.name,
              weight: pokemonInfo.weight,
              sprites: pokemonInfo.sprites,
              moves: pokemonInfo.moves,
            },
          }));
        });
      },
      error: (error) => {
        console.error('Error fetching all Pokemon data:', error);
      },
    });
  }

  handleSelectPokemon(pokemon: IPokemonCharacter) {
    const pokemonFound = this.pokemonsList.find(
      (p) => p.name === pokemon.name && p.id === pokemon.id
    );

    if (pokemonFound) {
      this.pokemonSelected = {
        imageUrl: pokemonFound.imageUrl,
        name: pokemonFound.name,
        id: pokemonFound.id,
        extraData: {
          type: pokemonFound.extraData?.type,
          weight: pokemonFound.extraData?.weight,
          sprites: pokemonFound.extraData?.sprites,
          moves: pokemonFound.extraData?.moves,
        },
      };
    } else {
      this.pokemonSelected = null;
    }
  }

  onPageChange(event: any) {
    this.page = event.page + 1;
    this.handleGetAllPokemons();
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

    this.pokemonFavorites = pokemonsData;
  }

  handleSearchCharacter() {
    if (this.inputCharacter) {
      let pokemon: any = null

      this.pokemonService.getPokemonCharacter(this.inputCharacter).subscribe({
        next: (data: any) => {
          pokemon = data
        },
      });

      if (pokemon !== null) {
        this.pokemonsList = [
          {
            imageUrl: pokemon.sprites.front_default,
            name: pokemon.name,
            id: pokemon.id,
            extraData: {
              type: pokemon.types[0].type.name,
              weight: pokemon.weight,
              sprites: pokemon.sprites,
              moves: pokemon.moves,
            },
          },
        ];
      } else {
        const pokemon = this.pokemonFavorites.find(
          (p) => p.name === this.inputCharacter
        );
        if (pokemon) {
          this.pokemonsList = [pokemon];
        } else {
          this.pokemonsList = [];
        }
      }
    } else {
      this.handleGetAllPokemons();
    }
  }
}
