import { Routes } from '@angular/router';
import { isAuthenticatedGuard, isCMroleGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then((m) => m.AUTH_ROUTES),
    },
    { 
        path: 'events/:eventId/photos', 
        canActivate: [isAuthenticatedGuard()], 
        loadComponent: () => import('./components/photos/photos.component').then(m => m.PhotosComponent)},
    {
        path: 'events/:eventId/posts',
        canActivate: [isAuthenticatedGuard(), isCMroleGuard()],
        loadComponent: () => import('./components/posts/posts.component').then(m => m.PostsComponent) },
    { 
        path: 'events/:eventId/posts/:postId', 
        canActivate: [isAuthenticatedGuard(), isCMroleGuard()],
        loadComponent: () => import('./components/post/post.component').then(m => m.PostComponent)},
    { 
        path: 'events', 
        canActivate: [isAuthenticatedGuard()],
        loadComponent: () => import('./components/events/events.component').then(m => m.EventsComponent) },  
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full',
    }
];