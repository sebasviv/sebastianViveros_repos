import { Component, Input, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IPokemonData } from '../../models/pokemon.model';
import { CommonModule } from '@angular/common';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-pokemon-card',
  imports: [CardModule, ButtonModule, CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent {
  @Input() imageUrl: string =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png';
  @Input() name: string = 'ditto';
  @Input() id: number = 132;
  @Input() extraData: IPokemonData | undefined = undefined;
  @Input() backgroundColor: string = 'yellow';

  backgroundColors: { name: string; color: string; border: string }[] = [
    {
      name: 'green',
      color: '#4CD1B8',
      border: '#3ba38f',
    },
    {
      name: 'orange',
      color: '#FFB380',
      border: '#bc835e',
    },
    {
      name: 'red',
      color: '#FF8A8A',
      border: '#a55b5b',
    },
    {
      name: 'gray',
      color: '#C7D3DB',
      border: '#7b848a',
    },
    {
      name: "purple",
      color: '#D6C4FF',
      border: '#a78bff',
    }
  ];

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.handleColorCard(this.backgroundColor);
  }

  handleColorCard(color: string) {
    const tmpColor = this.backgroundColors.find((c: any) => {
      return c.name.toString() == color;
    });

    if (tmpColor) {
      this.elementRef.nativeElement.style.setProperty(
        '--bg-custom-color',
        tmpColor.color
      );
      this.elementRef.nativeElement.style.setProperty(
        '--border-custom-color',
        tmpColor.border
      );
    }
  }
}
