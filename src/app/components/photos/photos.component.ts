import { Component, inject, OnInit, signal } from '@angular/core';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { lucideLoader2, lucideSearch } from '@ng-icons/lucide';
import { HlmCommandInputWrapperComponent } from '@spartan-ng/ui-command-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { provideIcons } from '@ng-icons/core';
import { PhotoComponent } from '../photo/photo.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhotosService } from '../../services/photos.service';
import { debounceTime, first } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HlmDialogComponent, HlmDialogContentComponent, HlmDialogFooterComponent, HlmDialogHeaderComponent, HlmDialogTitleDirective } from '@spartan-ng/ui-dialog-helm';
import { BrnDialogContentDirective, BrnDialogTriggerDirective } from '@spartan-ng/ui-dialog-brain';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events/events.service';
import { PhotosActionsComponent } from '../photos-actions/photos-actions.component';

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
    PhotosActionsComponent,

    ReactiveFormsModule
  ],
  providers: [provideIcons({ lucideSearch, lucideLoader2 })],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss'
})
export class PhotosComponent implements OnInit {
  photosService = inject(PhotosService);
  eventsService = inject(EventsService);
  activeRoute = inject(ActivatedRoute);

  isSelecting = this.photosService.isSelecting;
  isUploading = signal(false);

  selectedPhotos: File[] = [];
  eventId = Number(this.activeRoute.snapshot.paramMap.get('eventId'));

  eventPhotos = this.photosService.filteredPhotos;

  searchForm = new FormGroup({
    search: new FormControl('')
  });


  ngOnInit() {
    this.eventsService.changeEvent$.next(this.activeRoute.snapshot.paramMap.get('eventId')!);
    this.photosService.getPhotos(this.eventId).pipe(first()).subscribe();
    this.searchForm.get('search')?.valueChanges.pipe(
      debounceTime(300),
    ).subscribe((query) => {
      this.photosService.semanticSearch(this.eventId, query as string).pipe(first()).subscribe((ids) => {
        console.log(ids);
      });
    });
  }

  onFileSelect(event: any) {
    this.selectedPhotos = Array.from(event.target.files); 
  }

  onUpload(ctx: any) {
    this.isUploading.set(true);
    const formData = new FormData();

    this.selectedPhotos.forEach(photo => {
      formData.append('files', photo, photo.name);
    });

    this.photosService.uploadPhotos(this.eventId, formData).pipe(first()).subscribe((photos: any) => {
      this.isUploading.set(false);
      ctx.close();
    });
  }
}
