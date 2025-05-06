import {Component, inject, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import {CharactersService} from '@/services/api/characters.service';
import {RickAndMortyCharacter} from '@/interfaces/rickandmorty.interface';
import {CharacterDetailsComponent} from '@/components/character-details/character-details.component';
import {LoaderComponent} from '@/components/loader/loader.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-character-list',
  imports: [CharacterDetailsComponent, LoaderComponent],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.css'
})

export class CharacterListComponent implements OnInit, OnDestroy {
  protected characters: WritableSignal<RickAndMortyCharacter[]> = signal<RickAndMortyCharacter[]>([]);
  protected isLoading: WritableSignal<boolean> = signal<boolean>(true);
  protected currentPage: WritableSignal<number> = signal<number>(1);
  protected totalPages: WritableSignal<number> = signal<number>(1);

  private charactersService = inject(CharactersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const page = Number(params['page']) || 1;
      this.currentPage.set(page);
      this.loadCharacters();
    });
  }

  protected loadCharacters(): void {
    this.isLoading.set(true);
    this.charactersService.getCharactersList(this.currentPage())
      .subscribe({
        next: (response) => {
          if (!response || response.info.count <= 0) {
            this.router.navigate(['/personnages']);
          }
          this.characters.set(response.results);
          this.totalPages.set(response.info.pages);
          this.isLoading.set(false);
        },
        error: () => {
          this.router.navigate(['/personnages']);
          this.characters.set([]);
          this.isLoading.set(false);
        }
      });
  }

  protected nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      const nextPage = this.currentPage() + 1;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {page: nextPage},
        queryParamsHandling: 'merge'
      });
    }
  }


  protected previousPage(): void {
    if (this.currentPage() > 1) {
      const previousPage = this.currentPage() - 1;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {page: previousPage},
        queryParamsHandling: 'merge'
      });
    }
  }

  ngOnDestroy(): void {
    this.characters.set([]);
    this.isLoading.set(false);
    this.currentPage.set(1);
    this.totalPages.set(1);
  }
}
