import { Component, inject } from '@angular/core';
import { PhotosService } from '../../services/photos.service';
import { lucideX } from '@ng-icons/lucide';
import { provideIcons } from '@ng-icons/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'app-photos-actions',
  standalone: true,
  imports: [
    HlmButtonDirective,
    HlmIconComponent
  ],
  providers: [provideIcons({ lucideX })],
  templateUrl: './photos-actions.component.html',
  styleUrl: './photos-actions.component.scss'
})
export class PhotosActionsComponent {
  photosService = inject(PhotosService);

  createNewPost() {
    console.log('Create new post');
  }

  deleteSelectedPhotos() {
    const selectedPhotos = this.photosService.selectedPhotos();
    this.photosService.delete$.next(selectedPhotos.map(photo => photo.id));
    this.photosService.stopSelecting$.next(true);
  }

  stopSelecting() {
    this.photosService.stopSelecting$.next(true);
  }
}
