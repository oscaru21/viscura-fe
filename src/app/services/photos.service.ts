import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Photo } from '../models/photo.model';
import { map, mergeAll, Observable, toArray } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  http = inject(HttpClient);

  constructor() { }

  getPhotos(searchQuery: string = ''): Observable<Photo[]> {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/photos').pipe(
      mergeAll(),
      map(photo => ({
        id: photo.id,
        name: photo.title,
        url: photo.thumbnailUrl,
        resolution: '100x100'
      } as Photo)),
      toArray()
    );
  }
}
