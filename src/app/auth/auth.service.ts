
import { Injectable, computed, inject, signal } from '@angular/core';
import { BehaviorSubject, catchError, first, of, tap } from 'rxjs';
import { Credentials } from '../models/credentials.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';

export interface User {
    email: string;
    id: number;
    role: ('content manager' | 'photographer' | 'content reviewer')[];
}

export type AuthUser = User | null | undefined;

interface AuthState {
  user: AuthUser;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:8000';
  TOKEN_NAME = 'viscura_auth'
  http = inject(HttpClient);
  // sources
  private user$ = new BehaviorSubject<AuthUser>(undefined);

  // state
  private state = signal<AuthState>({
    user: undefined,
  });

  // selectors
  user = computed(() => this.state().user);

  get token() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor() {
    // load user from local storage
    const user = localStorage.getItem('user');
    if (user) {
      this.user$.next(JSON.parse(user));
    }
    this.user$.pipe(takeUntilDestroyed()).subscribe((user) =>
      this.state.update((state) => ({
        ...state,
        user,
      }))
    );
  }

  login(credentials: Credentials) {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials).pipe(
      first(),
      tap((res: any) => {
        // save token to local storage
        localStorage.setItem(this.TOKEN_NAME, res.access_token);
        // create user object
        const user: User = {
          email: res.email,
          id: res.id,
          role: res.roles
        }
        // set user
        this.user$.next(user);
        // save user to local storage
        localStorage.setItem('user', JSON.stringify(user));
        })
    );
  }

  logout() {
    this.user$.next(null);
    localStorage.removeItem(this.TOKEN_NAME);
    localStorage.removeItem('user');
  }

  createAccount(credentials: Credentials) {
    const testUser: User = {
        email: credentials.email,
        id: 1,
        role: ['content manager']
    }
    this.user$.next(testUser);
  }
}
