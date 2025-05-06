import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {CharactersService} from '@/services/api/characters.service';
import {RickAndMortyCharacter} from '@/models/api.model';
import {CharacterDetailsComponent} from '@/components/character-details/character-details.component';

@Component({
  selector: 'app-character-list',
  imports: [CharacterDetailsComponent],
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
        }
      );
  }
}
