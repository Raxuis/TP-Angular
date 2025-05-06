import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {RickAndMortyCharacter} from '@/interfaces/rickandmorty.interface';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private charactersApiUrl: string = 'https://rickandmortyapi.com/api/character';
  private http = inject(HttpClient);

  getCharacterById(id: string): Observable<RickAndMortyCharacter> {
    if (!id) {
      throw new Error('ID is required');
    }
    return this.http.get<RickAndMortyCharacter>(`${this.charactersApiUrl}/${id}`).pipe(
      map((character) => character)
    )
  }

  getCharactersList(): Observable<RickAndMortyCharacter[]> {
    return this.http.get<{ results: RickAndMortyCharacter[] }>(this.charactersApiUrl).pipe(
      map((response) => response.results)
    )
  }
}
