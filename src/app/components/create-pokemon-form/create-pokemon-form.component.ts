import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SelectModule } from 'primeng/select';
import { PokemonService } from '../../services/pokemon.service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { IPokemonCharacter } from '../../models/pokemon.model';
import { totalPokemonCount } from '../../shared/signals/pokemon-signals';

@Component({
  selector: 'app-create-pokemon-form',
  imports: [
    AutoCompleteModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    FloatLabelModule,
    ButtonModule,
  ],
  standalone: true,
  templateUrl: './create-pokemon-form.component.html',
  styleUrl: './create-pokemon-form.component.scss',
})
export class CreatePokemonFormComponent {
  pokemonsList: any[] = [];
  pokemonId: number = 0;
  pokemonName: FormControl;
  pokemonForm: FormGroup;
  pokemonType: FormControl;
  pokemonWeight: FormControl;
  pokemonMove: FormControl;
  pokemonSprites: FormGroup;
  pokemonTypes: any[] = [];
  pokemonMoves: any[] = [];
  pokemonWeights: any[] = [
    { label: '1000 kg', value: 1000 },
    { label: '2000 kg', value: 2000 },
    { label: '3000 kg', value: 3000 },
    { label: '4000 kg', value: 4000 },
    { label: '5000 kg', value: 5000 },
    { label: '6000 kg', value: 6000 },
    { label: '7000 kg', value: 7000 },
    { label: '8000 kg', value: 8000 },
    { label: '9000 kg', value: 9000 },
    { label: '10000 kg', value: 10000 },
  ];

  sprite_front_default: FormControl;
  sprite_back_default: FormControl;
  sprite_front_shiny: FormControl;
  sprite_back_shiny: FormControl;

  private readonly pokemonService = inject(PokemonService);

  constructor() {
    this.pokemonName = new FormControl('');
    this.pokemonType = new FormControl('');
    this.pokemonMove = new FormControl('');
    this.pokemonWeight = new FormControl('');
    this.pokemonSprites = new FormGroup({});
    this.sprite_front_default = new FormControl('');
    this.sprite_back_default = new FormControl('');
    this.sprite_front_shiny = new FormControl('');
    this.sprite_back_shiny = new FormControl('');

    this.pokemonForm = new FormGroup({
      name: this.pokemonName,
      type: this.pokemonType,
      move: this.pokemonMove,
      weight: this.pokemonWeight,
      sprite_front_default: this.sprite_front_default,
      sprite_back_default: this.sprite_back_default,
      sprite_front_shiny: this.sprite_front_shiny,
      sprite_back_shiny: this.sprite_back_shiny,
    });
  }

  ngOnInit() {
    this.handleMappingPokemonTypes();
    this.handleMappingPokemonMoves();
    this.handleGetLocalStorage();
  }

  handleMappingPokemonTypes() {
    this.pokemonService.getPokemonTypes().subscribe((response: any) => {
      this.pokemonTypes = response.results.map((type: any) => ({
        label: type.name,
        value: type.name,
      }));
    });
  }

  handleMappingPokemonMoves() {
    this.pokemonService.gePokemonMoves().subscribe((response: any) => {
      this.pokemonMoves = response.results.map((move: any) => ({
        label: move.name,
        value: move.name,
      }));
    });
  }

  handleGetIdPokemon() {
    const idSignal = computed(() => totalPokemonCount());
  
    if (idSignal() == 0) {
      window.location.replace('/home');
    }

    if (this.pokemonsList.length === 0) {
      this.pokemonId = idSignal() + 1;
    } else {
      const lastPokemon = this.pokemonsList[this.pokemonsList.length - 1];
      this.pokemonId = lastPokemon.id + 1;
    }
  }

  handleGetLocalStorage() {
    const stored = localStorage.getItem('myPokemons');
    const pokemons: any[] = stored ? JSON.parse(stored) : [];
    this.pokemonsList = pokemons;
    this.handleGetIdPokemon();
    console.log('Pokemons from local storage:', this.pokemonsList);
  }

  onSubmit() {
    console.log('Form submitted', this.pokemonForm.value);
    const formData = this.pokemonForm.value;
    const pokemonData: IPokemonCharacter = {
      name: formData.name,
      id: this.pokemonId,
      imageUrl: formData.sprite_front_default,
      extraData: {
        type: formData.type,
        weight: formData.weight,
        sprites: {
          front_default: formData.sprite_front_default,
          back_default: formData.sprite_back_default,
          front_shiny: formData.sprite_front_shiny,
          back_shiny: formData.sprite_back_shiny,
        },
        moves: [
          {
            move: {
              name: formData.move,
            },
          },
        ],
      },
    };
    this.pokemonsList.push(pokemonData);
    localStorage.setItem('myPokemons', JSON.stringify(this.pokemonsList));
  }

  onReset() {
    this.pokemonForm.reset();
    this.pokemonForm.markAsPristine();
    this.pokemonForm.markAsUntouched();
    this.pokemonForm.markAsPending();
    this.pokemonForm.updateValueAndValidity();
  }
}
