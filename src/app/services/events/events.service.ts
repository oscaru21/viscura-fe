import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { Event } from '../../models/event.model';
import { Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface EventsState {
  events: Event[];
  currentEvent: string | null;
  loaded: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  organizationId: number = 1;
  baseUrl: string = 'http://localhost:8000';
  // state
  eventsState = signal<EventsState>({
    events: [],
    currentEvent: null,
    loaded: false,
    error: null
  });

  // selectors
  events = computed(() => this.eventsState().events);
  currentEvent = computed(() => this.eventsState().currentEvent);
  loaded = computed(() => this.eventsState().loaded);
  error = computed(() => this.eventsState().error);

  // sources 
  private eventsLoadedSubject$ = new Subject<Event[]>();
  changeEvent$ = new Subject<string>();
  private addEvent$ = new Subject<Event>();

  constructor(private http: HttpClient) {
    // reducers
    this.eventsLoadedSubject$.subscribe({
      next: (events) => this.eventsState.update((state) => ({
        ...state,
        events,
        loaded: true
      })),
      error: (error) => this.eventsState.update((state) => ({
        ...state,
        error: error.message
      }))
    });
    this.changeEvent$.pipe(takeUntilDestroyed(),
      tap(() => {
        if(!this.loaded()){
          this.getEvents().pipe(take(1)).subscribe();
        }
      })
    ).subscribe((eventId) => {
      this.eventsState.update((state) => ({
        ...state,
        currentEvent: eventId
      }));
    }
    );
    this.addEvent$.pipe(takeUntilDestroyed()).subscribe((event) => {
      this.eventsState.update((state) => ({
        ...state,
        events: [...state.events, event]
      }));
    });
  }

  getEvents() {
    return this.http.get<Event[]>(`${this.baseUrl}/events`, { params: { org_id: this.organizationId } })
    .pipe(
      tap((events) => this.eventsLoadedSubject$.next(events))
    );
  }

  createEvent(event: Event) {
    const requestBody = {
      title: event.title,
      description: event.description,
      org_id: this.organizationId
    };
    return this.http.post(`${this.baseUrl}/events`, requestBody).pipe(
      tap((res: any) => {
        event = { ...event, id: res.id };
        this.addEvent$.next(event);
      })
    );
  }

  deleteEvent(eventId: string) {
    return this.http.delete(`${this.baseUrl}/events/${eventId}`, { params: { org_id: this.organizationId } });
  }
}
