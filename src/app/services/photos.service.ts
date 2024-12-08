import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Photo } from '../models/photo.model';
import { Observable, of, Subject, tap } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EventsService } from './events/events.service';

export interface PhotosState {
  photos: Photo[];
  filteredPhotos: Photo[];
  selectedPhotos: Photo[];
  loaded: boolean;
  isSelecting: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  http = inject(HttpClient);
  eventsService = inject(EventsService);

  // state
  state = signal<PhotosState>({
    photos: [],
    filteredPhotos: [],
    selectedPhotos: [],
    isSelecting: false,
    loaded: false,
    error: null
  });

  // selectors
  photos = computed(() => this.state().photos);
  filteredPhotos = computed(() => this.state().filteredPhotos);
  loaded = computed(() => this.state().loaded);
  error = computed(() => this.state().error);
  isSelecting = computed(() => this.state().isSelecting);
  selectedPhotos = computed(() => this.state().selectedPhotos);

  // sources
  private photosLoadedSubject$ = new Subject<Photo[]>();
  private filteredPhotosSubject$ = new Subject<number[]>();
  delete$ = new Subject<Photo['id'][]>();
  select$ = new Subject<number>();
  unselect$ = new Subject<number>();
  stopSelecting$ = new Subject<boolean>();

  constructor() {
    // reducers
    this.photosLoadedSubject$.pipe(takeUntilDestroyed()).subscribe({
      next: (photos) => this.state.update((state) => ({
        ...state,
        photos,
        filteredPhotos: photos,
        loaded: true
      }))
    });
    this.filteredPhotosSubject$.pipe(takeUntilDestroyed()).subscribe({
      next: (filteredPhotosIds) => this.state.update((state) => ({
        ...state,
        filteredPhotos: state.photos.filter((photo) => filteredPhotosIds.includes(photo.id))
      }))
    });
    this.delete$.pipe(
      takeUntilDestroyed(),
      switchMap((photoIds) => this.http.delete<Photo['id'][]>(`${this.baseUrl}/events/${this.eventsService.currentEvent()}/photos`, { body: photoIds }))
    ).subscribe((photoIds) => {
      this.state.update((state) => ({
        ...state,
        photos: state.photos.filter((photo) => !photoIds.includes(photo.id)),
        filteredPhotos: state.filteredPhotos.filter((photo) => !photoIds.includes(photo.id)),
        selectedPhotos: state.selectedPhotos.filter((photo) => !photoIds.includes(photo.id))
      }));
    });
    this.select$.pipe(takeUntilDestroyed()).subscribe((photoId) => {
      this.state.update((state) => ({
        ...state,
        isSelecting: true,
        selectedPhotos: [...state.selectedPhotos, state.photos.find((photo) => photo.id === photoId)!]
      }));
    });
    this.unselect$.pipe(takeUntilDestroyed()).subscribe((photoId) => {
      this.state.update((state) => ({
        ...state,
        selectedPhotos: state.selectedPhotos.filter((photo) => photo.id !== photoId)
      }));
    });
    this.stopSelecting$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.state.update((state) => ({
        ...state,
        isSelecting: false,
        selectedPhotos: []
      }));
    });
  }

  organizationId: number = 1;
  baseUrl: string = 'http://localhost:8000';

  getPhotos(eventId: number) {
    return this.http.get(`${this.baseUrl}/events/${eventId}/photos`).pipe(
      first() as any, 
      tap((photos) => this.photosLoadedSubject$.next(photos))
    ) as Observable<Photo[]>;
  }

  uploadPhotos(eventId: number, files: FormData) {
    return this.http.post<{uploaded_image_ids: number[]}>(`${this.baseUrl}/events/${eventId}/photos`, files).pipe(tap((res) => {
      const uploadedPhotos = [...this.state().photos, ...res.uploaded_image_ids.map((id) => ({ id, url: `${this.baseUrl}/events/${this.eventsService.currentEvent()}/photos/${id}.png`, name: `${id}.png` }))]
      this.photosLoadedSubject$.next(uploadedPhotos);
    }));
  }

  semanticSearch(eventId: number, query: string) {
    if (!query || query === ''){
      this.filteredPhotosSubject$.next(this.photos().map((photo) => photo.id));
      return of([]);
    }
    return this.http.get(`${this.baseUrl}/events/${eventId}/photos/search/`, { params: { text: query, threshold: 0.25 } }).pipe(
      first() as any,
      tap((ids) => this.filteredPhotosSubject$.next(ids))
    ) as Observable<number[]>;
  }

  clearSelection() {
    this.state.update((state) => ({
      ...state,
      selectedPhotos: [],
      isSelecting: false
    }));
  }
}
