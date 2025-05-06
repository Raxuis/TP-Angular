import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {RickAndMortyCharacter, RickAndMortyCharacterApiResponse} from '@/interfaces/rickandmorty.interface';

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

  getCharactersList(page: number): Observable<RickAndMortyCharacterApiResponse> {
    return this.http.get<RickAndMortyCharacterApiResponse>(`${this.charactersApiUrl}?page=${page}`).pipe(
      map((response) => response)
    )
  }
}
