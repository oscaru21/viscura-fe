import { Component, Input } from '@angular/core';
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

    StatusComponent
  ],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss'
})
export class PhotoComponent {
  @Input() photo: Photo = defaultPhoto;
}
