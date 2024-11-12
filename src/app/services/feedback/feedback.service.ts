import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Feedback } from '../../models/feedback.model';
import { EventsService } from '../events/events.service';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface FeedbackState {
  feedbacks: Feedback[];
  canEdit: boolean;
  loaded: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  baseUrl: string = 'http://localhost:8000';

  http = inject(HttpClient);
  eventsService = inject(EventsService);
  postId = 1; //this is a placeholder

  // state
  state = signal<FeedbackState>({
    feedbacks: [],
    canEdit: false,
    loaded: false,
    error: null
  });

  // selectors
  feedbacks = computed(() => this.state().feedbacks);
  canEdit = computed(() => this.state().canEdit);
  loaded = computed(() => this.state().loaded);
  error = computed(() => this.state().error);

  // sources
  private feedbacksLoadedSubject$ = new Subject<Feedback[]>();
  private add$ = new Subject<Feedback>();
  delete$ = new Subject<Feedback['id']>();


  constructor() { 
    //reducers
    this.feedbacksLoadedSubject$.pipe(takeUntilDestroyed()).subscribe({
      next: (feedbacks) => {
        this.state.update((state) => ({
          ...state,
          feedbacks,
          loaded: true
        }));
      }
    });
    this.delete$.pipe(takeUntilDestroyed()).subscribe((id) => {
      this.http.delete(`${this.baseUrl}/events/${this.eventsService.currentEvent()}/posts/${this.postId}/feedback/${id}`).subscribe(() => {
        this.getFeedbacks();
      });
    });
    this.add$.pipe(takeUntilDestroyed()).subscribe((feedback) => {
      this.state.update((state) => ({
        ...state,
        feedbacks: [feedback, ...state.feedbacks]
      }));
    });
  }

  getFeedbacks() {
    this.http.get<Feedback[]>(`${this.baseUrl}/events/${this.eventsService.currentEvent()}/posts/${this.postId}/feedback`).subscribe((feedbacks) => {
      this.feedbacksLoadedSubject$.next(feedbacks);
    });
  }

  createFeedback(comment: string) {
    const body: Record<string, string> = {
      feedback: comment,
      status: 'open'
    };

    return this.http.post<any>(`${this.baseUrl}/events/${this.eventsService.currentEvent()}/posts/${this.postId}/feedback`, body).subscribe((res) => {
      const feedbackId = res['feedback_id']['feedback_id'];
      const newFeedback: Feedback = {
        id: feedbackId,
        post_id: this.postId,
        event_id: Number(this.eventsService.currentEvent()),
        feedback_comment: comment,
        feedback_status: 'open'
      };
      this.add$.next(newFeedback);
    });
  }
}
