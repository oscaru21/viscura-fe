import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'photos', loadComponent: () => import('./components/photos/photos.component').then(m => m.PhotosComponent)},
    { path: '', redirectTo: '/photos', pathMatch: 'full' },
];