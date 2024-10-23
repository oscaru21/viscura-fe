import { Component, computed, inject, Signal, signal } from '@angular/core';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { lucideSearch } from '@ng-icons/lucide';
import { HlmCommandInputWrapperComponent } from '@spartan-ng/ui-command-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { provideIcons } from '@ng-icons/core';
import { Photo } from '../../models/photo.model';
import { PhotoComponent } from '../photo/photo.component';
import { FormsModule } from '@angular/forms';
import { PhotosService } from '../../services/photos.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, map, mergeAll, switchMap, tap, toArray } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HlmIconComponent,
    HlmCommandInputWrapperComponent,
    HlmInputDirective,
    HlmButtonDirective,
    BrnMenuTriggerDirective,

    PhotoComponent
  ],
  providers: [provideIcons({ lucideSearch })],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss'
})
export class PhotosComponent {
  photosService = inject(PhotosService);

  searchQuery = signal<string>('');
  searchQuery$ = toObservable(this.searchQuery);
  filteredPhotos$ = this.searchQuery$.pipe(
    switchMap(query => this.photosService.getPhotos(query)),
    map(photos => photos.slice(0, 10))
  );
}
