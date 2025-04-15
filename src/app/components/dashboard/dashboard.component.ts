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
  limit: number = 10;
  page: number = 1;
  private readonly pokemonService = inject(PokemonService);
  pokemonSelected: IPokemonCharacter | null = null;
  totalPokemons: number = 0;

  ngOnInit() {
    this.handleGetAllPokemons();
  }

  handleGetAllPokemons() {
    const offset = this.limit * (this.page - 1);
    this.pokemonService.getAllPokemonCharacters(this.limit, offset).subscribe({
      next: (data) => {
        const requests = data.results.map((pokemon: any) =>
          this.pokemonService.getPokemonCharacter(pokemon.name)
        );

        this.totalPokemons = data.count;

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

  handleSearchCharacter() {
    if (this.inputCharacter) {
      this.pokemonService.getPokemonCharacter(this.inputCharacter).subscribe({
        next: (data: any) => {
          if (data)
            this.pokemonsList = [
              {
                imageUrl: data.sprites.front_default,
                name: data.name,
                id: data.id,
                extraData: {
                  type: data.types[0].type.name,
                  weight: data.weight,
                  sprites: data.sprites,
                  moves: data.moves,
                },
              },
            ];
        },
        error: (error) => {
          console.error('Error fetching Pokemon data:', error);
        },
      });
    } else {
      this.handleGetAllPokemons();
    }
  }
}
