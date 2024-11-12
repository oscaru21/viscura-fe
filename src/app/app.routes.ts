import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'events/:eventId/photos', loadComponent: () => import('./components/photos/photos.component').then(m => m.PhotosComponent)},
    { path: 'events/:eventId/posts/:postId', loadComponent: () => import('./components/post/post.component').then(m => m.PostComponent)},
    { path: 'events', loadComponent: () => import('./components/events/events.component').then(m => m.EventsComponent) },
    { path: '', loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent) },
];