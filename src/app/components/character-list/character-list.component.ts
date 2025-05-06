import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {CharactersService} from '@/services/api/characters.service';
import {RickAndMortyCharacter} from '@/models/api.model';
import {CharacterDetailsComponent} from '@/components/character-details/character-details.component';
import {LoaderComponent} from '@/components/loader/loader.component';

@Component({
  selector: 'app-character-list',
  imports: [CharacterDetailsComponent, LoaderComponent],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent implements OnInit {
  protected characters: WritableSignal<RickAndMortyCharacter[]> = signal<RickAndMortyCharacter[]>([]);
  protected isLoading: WritableSignal<boolean> = signal<boolean>(true);
  private charactersService = inject(CharactersService);

  ngOnInit(): void {
    this.isLoading.set(true);
    this.charactersService.getCharactersList()
      .subscribe(
        {
          next: (result) => {
            if (!result) {
              return;
            }
            this.characters.set(result);
            this.isLoading.set(false);
          },
          error: () => {
            this.characters.set([]);
            this.isLoading.set(false);
          }
        }
      );
  }
}
