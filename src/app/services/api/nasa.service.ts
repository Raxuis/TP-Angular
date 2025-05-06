import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Apod} from '@/interfaces/apod.interface';

@Injectable({
  providedIn: 'root'
})
export class NasaService {
  private apiKey: string = '5vUSrOvcxAI8mslwRnDoj3mJgOTypmE8nselgF7I';
  private apodApiUrl: string = 'https://api.nasa.gov/planetary/apod';
  private http = inject(HttpClient);

  getApodApiUrl(): Observable<Apod> {
    return this.http.get<Apod>(`${this.apodApiUrl}?api_key=${this.apiKey}&thumbs=true`).pipe(
      map((apod) => apod)
    );
  }
}
