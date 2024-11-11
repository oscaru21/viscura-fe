import { Component, computed, inject, Input } from '@angular/core';
import { HlmAspectRatioDirective } from '@spartan-ng/ui-aspectratio-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { LazyLoadImageModule } from 'ng-lazyload-image';

import { Photo } from '../../models/photo.model';
import { StatusComponent } from '../status/status.component';
import { HlmMenuComponent, HlmMenuItemDirective } from '@spartan-ng/ui-menu-helm';
import { BrnContextMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { PhotosService } from '../../services/photos.service';
import { lucideCheck } from '@ng-icons/lucide';
import { provideIcons } from '@ng-icons/core';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { CommonModule } from '@angular/common';

const defaultPhoto: Photo = {
  id: 0,
  name: 'Invalid photo',
  url: 'https://www.fivebranches.edu/wp-content/uploads/2021/08/default-image.jpg',
  resolution: '1080 x 720 px'
};

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [
    LazyLoadImageModule,
    HlmAspectRatioDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardContentDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmMenuComponent,
    HlmMenuItemDirective,
    BrnContextMenuTriggerDirective,
    HlmIconComponent,

    StatusComponent
  ],
  providers: [provideIcons({ lucideCheck })],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss'
})
export class PhotoComponent {
  @Input() photo: Photo = defaultPhoto;

  photosService = inject(PhotosService);
  isSelecting = this.photosService.isSelecting;
  isSelected = computed(() => this.photosService.selectedPhotos().map(photo => photo.id).includes(this.photo.id));

  isHovered = false;

  deletePhoto() {
    this.photosService.delete$.next([this.photo.id]);
  }

  onClick() {
    if (this.isSelecting()) {
      this.onSelect();
    }
  }

  onSelect() {
    this.isSelected() ? this.photosService.unselect$.next(this.photo.id) : this.photosService.select$.next(this.photo.id);
  }
}
