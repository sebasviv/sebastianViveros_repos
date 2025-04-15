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

@Component({
  selector: 'app-home',
  imports: [
    InputTextModule,
    FormsModule,
    CardModule,
    ButtonModule,
    PokemonCardComponent,
    CommonModule,
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  inputCharacter: string = '';
  pokemonsList: IPokemonCharacter[] = [];
  limit: number = 20;
  page: number = 1;
  private readonly pokemonService = inject(PokemonService);

  ngOnInit() {
    this.handleGetAllPokemons();
  }

  handleGetAllPokemons() {
    const offset = this.limit * (this.page - 1); // ojo: páginas deben empezar en 0
    this.pokemonService.getAllPokemonCharacters(this.limit, offset).subscribe({
      next: (data) => {
        const requests = data.results.map((pokemon: any) =>
          this.pokemonService.getPokemonCharacter(pokemon.name)
        );

        forkJoin(requests).subscribe((responses: any) => {
          this.pokemonsList = responses.map((pokemonInfo: any) => ({
            imageUrl: pokemonInfo.sprites.front_default,
            name: pokemonInfo.name,
            id: pokemonInfo.id,
          }));
        });
      },
      error: (error) => {
        console.error('Error fetching all Pokemon data:', error);
      },
    });
  }


  handleSearchCharacter() {
    // console.log('Searching for character:', this.inputCharacter);
    // this.pokemonService.getPokemonCharacter(this.inputCharacter).subscribe({
    //   next: (data) => {
    //     console.log('Pokemon data:', data);
    //   },
    //   error: (error) => {
    //     console.error('Error fetching Pokemon data:', error);
    //   },
    // });
  }
}
