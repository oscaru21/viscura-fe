import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Post, PostRequest } from '../../models/post.model';
import { of, Subject } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface PostsState {
  posts: Post[];
  currentPost: string | null;
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
  currentPostData = computed(() => this.postsState().posts.find(post => post.id === this.currentPost()));
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
      tap(() => {
        if(!this.loaded()){
          this.getPosts().pipe(take(1)).subscribe();
        }
      })
    ).subscribe((postId) => {
      this.postsState.update((state) => ({
        ...state,
        currentPost: postId
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

  getPosts() {
    // ENDPOINT MISSING
    // return this.http.get<Post[]>(`${this.baseUrl}/posts`, { params: { org_id: this.organizationId } })
    return of([])
    .pipe(
      tap((posts) => this.postsLoadedSubject$.next(posts))
    );
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
}
