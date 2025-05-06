import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {CharactersService} from '@/services/characters.service';
import {RickAndMortyCharacter} from '@/models/api.model';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-character-list',
  imports: [
    RouterLink
  ],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent implements OnInit {
  characters: WritableSignal<RickAndMortyCharacter[]> = signal<RickAndMortyCharacter[]>([]);
  charactersService = inject(CharactersService);

  ngOnInit(): void {
    this.charactersService.getCharactersList()
      .subscribe((characters: RickAndMortyCharacter[]) => {
          this.characters.set(characters);
          console.log('characters', this.characters());
        }
      );
  }
}
