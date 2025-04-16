import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
  apiUrlTypes = 'https://pokeapi.co/api/v2/type/';
  apiUrlMoves = 'https://pokeapi.co/api/v2/move/';

  constructor(private http: HttpClient) {}

  getAllPokemonCharacters(limit: number = 20, offset: number = 0): Observable<any> {
    return this.http.get(`${this.apiUrl}?limit=${limit}&offset=${offset}`).pipe(
      catchError((error) => {
        console.error('Error fetching Pokemon data:', error);
        return throwError(
          () => new Error('Error fetching Pokemon data' + error.message)
        );
      })
    );
  }

  getPokemonCharacter(name: string) {
    return this.http.get(`${this.apiUrl}${name}`).pipe(
      catchError((error) => {
        console.error('Error fetching Pokemon data:', error);
        return throwError(
          () => new Error('Error fetching Pokemon data' + error.message)
        );
      })
    );
  }
  getPokemonTypes() {
    return this.http.get(`${this.apiUrlTypes}`).pipe(
      catchError((error) => {
        console.error('Error fetching Pokemon types:', error);
        return throwError(
          () => new Error('Error fetching Pokemon types' + error.message)
        );
      })
    );
  }

  gePokemonMoves() {
    return this.http.get(`${this.apiUrlMoves}?limit=100`).pipe(
      catchError((error) => {
        console.error('Error fetching Pokemon moves:', error);
        return throwError(
          () => new Error('Error fetching Pokemon moves' + error.message)
        );
      })
    );
  }
}
