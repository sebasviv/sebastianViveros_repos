import { Component } from '@angular/core';
import { CreatePokemonFormComponent } from '../../components/create-pokemon-form/create-pokemon-form.component';

@Component({
  selector: 'app-create-character',
  imports: [CreatePokemonFormComponent],
  templateUrl: './create-character.component.html',
  styleUrl: './create-character.component.scss'
})
export class CreateCharacterComponent {

}
