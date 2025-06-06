import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'create-character',
    loadComponent: () =>
      import('./pages/create-character/create-character.component').then(
        (m) => m.CreateCharacterComponent
      ),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./pages/favorites/favorites.component').then(
        (m) => m.FavoritesComponent
      ),

  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
