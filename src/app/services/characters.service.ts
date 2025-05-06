import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {RickAndMortyCharacter} from '@/models/api.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private http = inject(HttpClient);

  getCharactersList(): Observable<RickAndMortyCharacter[]> {
    return this.http.get<{ results: RickAndMortyCharacter[] }>('https://rickandmortyapi.com/api/character').pipe(
      map((response) => {
        console.log(response.results)
        return response.results;
      })
    )
  }
}
