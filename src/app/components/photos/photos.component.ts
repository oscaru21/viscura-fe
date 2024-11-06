import { Component, computed, inject, OnInit, Signal, signal } from '@angular/core';
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
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { debounce, debounceTime, filter, first, map, mergeAll, Observable, of, switchMap, take, tap, toArray } from 'rxjs';
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
export class PhotosComponent implements OnInit {
  photosService = inject(PhotosService);
  activeRoute = inject(ActivatedRoute);

  selectedPhotos: File[] = [];
  eventId = Number(this.activeRoute.snapshot.paramMap.get('eventId'));

  eventPhotos = this.photosService.filteredPhotos;

  searchForm = new FormGroup({
    search: new FormControl('')
  });


  ngOnInit() {
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
    const formData = new FormData();

    this.selectedPhotos.forEach(photo => {
      formData.append('files', photo, photo.name);
    });

    this.photosService.uploadPhotos(this.eventId, formData).pipe(first()).subscribe((photos: any) => {
      ctx.close();
    });
  }
}
