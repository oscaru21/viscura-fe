import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Post, PostRequest } from '../../models/post.model';
import { of, Subject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  loaded: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  organizationId: number = 1;
  baseUrl: string = 'http://localhost:8000';
  // state
  postsState = signal<PostsState>({
    posts: [],
    currentPost: null,
    loaded: false,
    error: null
  });

  // selectors
  posts = computed(() => this.postsState().posts);
  currentPost = computed(() => this.postsState().currentPost);
  loaded = computed(() => this.postsState().loaded);
  error = computed(() => this.postsState().error);

  // sources 
  private postsLoadedSubject$ = new Subject<Post[]>();
  changePost$ = new Subject<string>();
  private addPost$ = new Subject<Post>();

  constructor(private http: HttpClient) {
    // reducers
    this.postsLoadedSubject$.subscribe({
      next: (posts) => this.postsState.update((state) => ({
        ...state,
        posts,
        loaded: true
      })),
      error: (error) => this.postsState.update((state) => ({
        ...state,
        error: error.message
      }))
    });
    this.changePost$.pipe(takeUntilDestroyed(),
      switchMap((postId) => this.getPost(postId))
    ).subscribe((post) => {
      this.postsState.update((state) => ({
        ...state,
        currentPost: post
      }));
    }
    );
    this.addPost$.pipe(takeUntilDestroyed()).subscribe((post) => {
      this.postsState.update((state) => ({
        ...state,
        posts: [...state.posts, post]
      }));
    });
  }

  getPosts(eventId: string) {
    return this.http.get<Post[]>(`${this.baseUrl}/events/${eventId}/posts`).pipe(
      tap((posts) => this.postsLoadedSubject$.next(posts))
    )
  }

  getPost(postId: string) {
    return this.http.get<Post>(`${this.baseUrl}/posts/${postId}`);
  }

  createPost(eventId: string, imageIds: number[]) {
    const requestBody: PostRequest = {
      event_id: Number(eventId),
      caption: "",
      image_ids: imageIds,
      user_id: 1
    };
    return this.http.post(`${this.baseUrl}/posts`, requestBody).pipe(
      tap((res: any) => {
        const post = { 
          id: res.post_id,
          caption: "",
          image_ids: imageIds
         };
        this.addPost$.next(post);
      }),
      map((res: any) => res.post_id)
    );
  }

  deletePost(postId: string) {
    return this.http.delete(`${this.baseUrl}/posts/${postId}`);
  }

  updatePostCaption(caption: string) {
    const updatedPost = { 
      caption,
      event_id: this.currentPost()?.event_id,
      image_ids: this.currentPost()?.image_ids,
     };
    const postId: number = parseInt(this.currentPost()?.id as string);
    this.postsState.update((state) => ({
      ...state,
      currentPost: updatedPost
    }));
    return this.http.put(`${this.baseUrl}/posts/${postId}`, updatedPost);
  }
}
