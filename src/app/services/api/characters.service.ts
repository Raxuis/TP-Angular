import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {RickAndMortyCharacter} from '@/models/api.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private charactersApiUrl: string = 'https://rickandmortyapi.com/api/character';
  private http = inject(HttpClient);

  getCharactersList(): Observable<RickAndMortyCharacter[]> {
    return this.http.get<{ results: RickAndMortyCharacter[] }>(this.charactersApiUrl).pipe(
      map((response) => response.results)
    )
  }
}
