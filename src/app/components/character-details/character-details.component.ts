import {Component, Input} from '@angular/core';
import {RickAndMortyCharacter} from '@/models/api.model';
import {RouterLink} from '@angular/router';
import {NgClass, NgOptimizedImage, NgStyle} from '@angular/common';

@Component({
  selector: 'app-character-details',
  imports: [
    RouterLink,
    NgOptimizedImage,
    NgStyle,
    NgClass
  ],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.css'
})
export class CharacterDetailsComponent {
  @Input() characterDetails?: RickAndMortyCharacter;
  @Input() moreInfo?: boolean = false;
}
