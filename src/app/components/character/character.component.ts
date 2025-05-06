import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {RickAndMortyCharacter} from '@/models/api.model';
import {CharactersService} from '@/services/api/characters.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CharacterDetailsComponent} from '@/components/character-details/character-details.component';

@Component({
  selector: 'app-character',
  imports: [
    CharacterDetailsComponent
  ],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css'
})
export class CharacterComponent implements OnInit {
  protected character: WritableSignal<RickAndMortyCharacter | undefined> = signal<RickAndMortyCharacter | undefined>(undefined)
  private characterService = inject(CharactersService)
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (!id) {
      this.router.navigate(['personnages']);
    }
    this.characterService.getCharacterById(id).subscribe(character => {
      if (!character) {
        this.router.navigate(['personnages']);
        return;
      }
      this.character.set(character);
    })
  }

}
