import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  Form,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SelectModule } from 'primeng/select';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-create-pokemon-form',
  imports: [
    AutoCompleteModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
  ],
  standalone: true,
  templateUrl: './create-pokemon-form.component.html',
  styleUrl: './create-pokemon-form.component.scss',
})
export class CreatePokemonFormComponent {
  pokemonForm: FormGroup;
  pokemonType: FormControl;
  pokemonSprites: FormControl;
  pokemonMoves: FormControl;
  pokemonTypes: any[] = [];
  private readonly pokemonService = inject(PokemonService);

  constructor() {
    (this.pokemonType = new FormControl('')),
      (this.pokemonSprites = new FormControl('')),
      (this.pokemonSprites = new FormControl('')),
      (this.pokemonMoves = new FormControl(''));

    this.pokemonForm = new FormGroup({
      type: this.pokemonType,
      sprites: this.pokemonSprites,
      moves: this.pokemonMoves,
    });
  }

  ngOnInit() {
    this.handleMappingPokemonTypes();
  }

  handleMappingPokemonTypes() {
    this.pokemonService.getPokemonTypes().subscribe((response: any) => {
      this.pokemonTypes = response.results.map((type: any) => ({
        label: type.name,
        value: type.name,
      }));
    });
  }
}
