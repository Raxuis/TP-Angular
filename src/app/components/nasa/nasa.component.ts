import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {NasaService} from '@/services/api/nasa.service';
import {Apod} from '@/models/apod.model';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-nasa',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './nasa.component.html',
  styleUrl: './nasa.component.css'
})
export class NasaComponent implements OnInit {
  private nasa = inject(NasaService);
  apod: WritableSignal<Apod | undefined> = signal(undefined);
  mediaUrl: WritableSignal<string | undefined> = signal(undefined);

  ngOnInit(): void {
    this.nasa.getApodApiUrl()
      .subscribe({
        next: result => {
          if (!result) {
            return;
          }
          this.apod.set(result);
          if (result.media_type === 'image') {
            this.mediaUrl.set(result.url);
          } else {
            this.mediaUrl.set(result.thumbnail_url);
          }
        },
        error: () => {
          this.apod.set(undefined);
          this.mediaUrl.set(undefined);
        }
      });
  }
}
