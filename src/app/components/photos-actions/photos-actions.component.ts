import { Component, inject } from '@angular/core';
import { PhotosService } from '../../services/photos.service';
import { lucideX } from '@ng-icons/lucide';
import { provideIcons } from '@ng-icons/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { BrnAlertDialogContentDirective, BrnAlertDialogTriggerDirective } from '@spartan-ng/ui-alertdialog-brain';
import { HlmAlertDialogActionButtonDirective, HlmAlertDialogCancelButtonDirective, HlmAlertDialogComponent, HlmAlertDialogContentComponent, HlmAlertDialogDescriptionDirective, HlmAlertDialogFooterComponent, HlmAlertDialogHeaderComponent, HlmAlertDialogOverlayDirective, HlmAlertDialogTitleDirective } from '@spartan-ng/ui-alertdialog-helm';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-photos-actions',
  standalone: true,
  imports: [
    HlmButtonDirective,
    HlmIconComponent,
    BrnAlertDialogTriggerDirective,
    BrnAlertDialogContentDirective,

    HlmAlertDialogComponent,
    HlmAlertDialogOverlayDirective,
    HlmAlertDialogHeaderComponent,
    HlmAlertDialogFooterComponent,
    HlmAlertDialogTitleDirective,
    HlmAlertDialogDescriptionDirective,
    HlmAlertDialogCancelButtonDirective,
    HlmAlertDialogActionButtonDirective,
    HlmAlertDialogContentComponent,
  ],
  providers: [provideIcons({ lucideX })],
  templateUrl: './photos-actions.component.html',
  styleUrl: './photos-actions.component.scss'
})
export class PhotosActionsComponent {
  photosService = inject(PhotosService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  createNewPost() {
    const imageIds = this.photosService.selectedPhotos().map(photo => photo.id);
    //TODO: add logic to call posts service to create a new post
    const newPostId = 1; //this is just a placeholder
    const eventId = this.route.snapshot.paramMap.get('eventId');
    if (eventId) {
      this.router.navigate([`/events/${eventId}/posts/${newPostId}`]);
    }
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
