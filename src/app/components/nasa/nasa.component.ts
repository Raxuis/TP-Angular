import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {NasaService} from '@/services/api/nasa.service';
import {Apod} from '@/models/apod.model';

@Component({
  selector: 'app-nasa',
  imports: [],
  templateUrl: './nasa.component.html',
  styleUrl: './nasa.component.css'
})
export class NasaComponent implements OnInit {
  private nasa = inject(NasaService);
  apod: WritableSignal<Apod | undefined> = signal(undefined);
  mediaUrl: WritableSignal<string | undefined> = signal(undefined);

  ngOnInit(): void {
    this.nasa.getApodApiUrl()
      .subscribe((apiResponse: Apod) => {
          this.apod.set(apiResponse)
          this.mediaUrl.set(apiResponse.media_type === 'video' ? apiResponse.thumbnail_url : apiResponse.url);
        }
      );
  }
}
