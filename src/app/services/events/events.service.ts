import { HttpClient } from '@angular/common/http';
import { Injectable, signal, Signal } from '@angular/core';
import { Event } from '../../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  organizationId: number = 1;
  baseUrl: string = 'http://localhost:8000';
  events = signal([]);

  constructor(private http: HttpClient) {
    this.getEvents().subscribe((events: any) => {
      this.events.set(events);
    });
  }

  getEvents() {
    return this.http.get(`${this.baseUrl}/events`, { params: { org_id: this.organizationId } });
  }

  createEvent(event: Event) {
    const requestBody = {
      title: event.title,
      description: event.description,
      org_id: this.organizationId
    };
    return this.http.post(`${this.baseUrl}/events`, requestBody);
  }

  deleteEvent(eventId: string) {
    return this.http.delete(`${this.baseUrl}/events/${eventId}`, { params: { org_id: this.organizationId } });
  }
}
