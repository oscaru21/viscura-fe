import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Photo } from '../models/photo.model';
import { Observable, of, Subject, tap } from 'rxjs';
import { first } from 'rxjs/operators';

export interface PhotosState {
  photos: Photo[];
  filteredPhotos: Photo[];
  loaded: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  http = inject(HttpClient);

  // state
  state = signal<PhotosState>({
    photos: [],
    filteredPhotos: [],
    loaded: false,
    error: null
  });

  // selectors
  photos = computed(() => this.state().photos);
  filteredPhotos = computed(() => this.state().filteredPhotos);
  loaded = computed(() => this.state().loaded);
  error = computed(() => this.state().error);

  // sources
  private photosLoadedSubject$ = new Subject<Photo[]>();
  private filteredPhotosSubject$ = new Subject<number[]>();

  constructor() {
    // reducers
    this.photosLoadedSubject$.subscribe({
      next: (photos) => this.state.update((state) => ({
        ...state,
        photos,
        filteredPhotos: photos,
        loaded: true
      }))
    });
    this.filteredPhotosSubject$.subscribe({
      next: (filteredPhotosIds) => this.state.update((state) => ({
        ...state,
        filteredPhotos: state.photos.filter((photo) => filteredPhotosIds.includes(photo.id))
      }))
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
    return this.http.post(`${this.baseUrl}/events/${eventId}/photos`, files);
  }

  semanticSearch(eventId: number, query: string) {
    if (!query || query === ''){
      console.log(query);
      this.filteredPhotosSubject$.next(this.photos().map((photo) => photo.id));
      return of([]);
    }
    return this.http.get(`${this.baseUrl}/events/${eventId}/photos/search/`, { params: { text: query, num_results: 3 } }).pipe(
      first() as any,
      tap((ids) => this.filteredPhotosSubject$.next(ids))
    ) as Observable<number[]>;
  }
}
