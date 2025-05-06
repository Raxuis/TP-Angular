import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {NasaService} from '@/services/api/nasa.service';
import {Apod} from '@/interfaces/apod.interface';
import {NgOptimizedImage} from '@angular/common';
import {LoaderComponent} from '@/components/loader/loader.component';

@Component({
  selector: 'app-nasa',
  imports: [
    NgOptimizedImage,
    LoaderComponent
  ],
  templateUrl: './nasa.component.html',
  styleUrl: './nasa.component.css'
})
export class NasaComponent implements OnInit {
  private nasa = inject(NasaService);
  apod: WritableSignal<Apod | undefined> = signal(undefined);
  mediaUrl: WritableSignal<string | undefined> = signal(undefined);
  isLoading: WritableSignal<boolean> = signal(true);

  ngOnInit(): void {
    this.isLoading.set(true);
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
          this.isLoading.set(false);
        },
        error: () => {
          this.apod.set(undefined);
          this.mediaUrl.set(undefined);
          this.isLoading.set(false);
        }
      });
  }
}
