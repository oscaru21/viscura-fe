import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Photo } from '../models/photo.model';
import { catchError, map, mergeAll, Observable, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  http = inject(HttpClient);

  organizationId: number = 1;
  baseUrl: string = 'http://localhost:8000';
  photos = signal([]);

  getPhotos(eventId: number) {
    return this.http.get(`${this.baseUrl}/events/${eventId}/photos`) as Observable<Photo[]>;
  }

  uploadPhotos(eventId: number, files: FormData) {
    return this.http.post(`${this.baseUrl}/events/${eventId}/photos`, files);
  }
}
