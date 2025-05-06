import {Component, inject, OnInit} from '@angular/core';
import {CharactersService} from '@/services/characters.service';
import {RickAndMortyCharacter} from '@/models/api.model';

@Component({
  selector: 'app-character-list',
  imports: [],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent implements OnInit {
  characters: RickAndMortyCharacter[] = [];
  charactersService = inject(CharactersService);

  ngOnInit(): void {
    this.charactersService.getCharactersList().subscribe(
      (response: RickAndMortyCharacter[]) => {
        this.characters = response;
      },
      (error: any) => {
        console.error('Error fetching characters:', error);
      }
    )
  }
}
