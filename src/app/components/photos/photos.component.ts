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
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhotosService } from '../../services/photos.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { filter, first, map, mergeAll, Observable, of, switchMap, tap, toArray } from 'rxjs';
import { CommonModule } from '@angular/common';
import { photos } from '../../models/mocks';
import { HlmDialogComponent, HlmDialogContentComponent, HlmDialogFooterComponent, HlmDialogHeaderComponent, HlmDialogTitleDirective } from '@spartan-ng/ui-dialog-helm';
import { BrnDialogContentDirective, BrnDialogTriggerDirective } from '@spartan-ng/ui-dialog-brain';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HlmIconComponent,
    HlmCommandInputWrapperComponent,
    HlmInputDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,
    BrnMenuTriggerDirective,

    BrnDialogTriggerDirective,
    BrnDialogContentDirective,

    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,

    PhotoComponent,

    ReactiveFormsModule
  ],
  providers: [provideIcons({ lucideSearch })],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss'
})
export class PhotosComponent {
  photosService = inject(PhotosService);
  activeRoute = inject(ActivatedRoute);

  searchQuery = signal<string>('');
  searchQuery$ = toObservable(this.searchQuery);
  filteredPhotos$ = of([...photos]);

  selectedPhotos: File[] = [];
  eventId = Number(this.activeRoute.snapshot.paramMap.get('eventId'));

  eventPhotos$: Observable<Photo[]> = this.photosService.getPhotos(this.eventId);

  onFileSelect(event: any) {
    this.selectedPhotos = Array.from(event.target.files); 
  }

  onUpload(ctx: any) {
    const formData = new FormData();

    this.selectedPhotos.forEach(photo => {
      formData.append('files', photo, photo.name);
    });

    this.photosService.uploadPhotos(this.eventId, formData).pipe(first()).subscribe((photos: any) => {
      ctx.close();
    });
  }
}
