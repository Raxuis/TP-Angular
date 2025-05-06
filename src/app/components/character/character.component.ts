import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {RickAndMortyCharacter} from '@/models/api.model';
import {CharactersService} from '@/services/api/characters.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CharacterDetailsComponent} from '@/components/character-details/character-details.component';
import {LoaderComponent} from '@/components/loader/loader.component';

@Component({
  selector: 'app-character',
  imports: [
    CharacterDetailsComponent,
    LoaderComponent
  ],
  templateUrl: './character.component.html',
  styleUrl: './character.component.css'
})
export class CharacterComponent implements OnInit {
  protected character: WritableSignal<RickAndMortyCharacter | undefined> = signal<RickAndMortyCharacter | undefined>(undefined)
  protected isLoading: WritableSignal<boolean> = signal<boolean>(true);
  private characterService = inject(CharactersService)
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.isLoading.set(true);
    const id = this.route.snapshot.params['id'];
    if (!id) {
      this.router.navigate(['personnages']);
    }
    this.characterService.getCharacterById(id).subscribe({
      next: result => {
        if (!result) {
          this.router.navigate(['personnages']);
        }
        this.character.set(result);
        this.isLoading.set(false);
      },
      error: () => {
        this.router.navigate(['personnages']);
        this.isLoading.set(false);
      }
    })
  }

}
