
import { Injectable, computed, inject, signal } from '@angular/core';
import { from, defer, BehaviorSubject } from 'rxjs';
import { Credentials } from '../models/credentials.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface User {
    email: string;
    id: number;
    role: 'CM' | 'PHOTOGRAPHER' | 'REVIEWER';
}

export type AuthUser = User | null | undefined;

interface AuthState {
  user: AuthUser;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // sources
  private user$ = new BehaviorSubject<AuthUser>(undefined);

  // state
  private state = signal<AuthState>({
    user: undefined,
  });

  // selectors
  user = computed(() => this.state().user);

  constructor() {
    this.user$.pipe(takeUntilDestroyed()).subscribe((user) =>
      this.state.update((state) => ({
        ...state,
        user,
      }))
    );
  }

  login(credentials: Credentials) {
    const testUser: User = {
        email: credentials.email,
        id: 1,
        role: 'CM'
    }
    this.user$.next(testUser);
  }

  logout() {
    this.user$.next(null);
  }

  createAccount(credentials: Credentials) {
    const testUser: User = {
        email: credentials.email,
        id: 1,
        role: 'CM'
    }
    this.user$.next(testUser);
  }
}
