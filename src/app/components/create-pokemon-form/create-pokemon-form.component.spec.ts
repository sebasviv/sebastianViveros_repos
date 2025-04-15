import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePokemonFormComponent } from './create-pokemon-form.component';

describe('CreatePokemonFormComponent', () => {
  let component: CreatePokemonFormComponent;
  let fixture: ComponentFixture<CreatePokemonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePokemonFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePokemonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
