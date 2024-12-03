import { Component, computed, inject } from '@angular/core';
import { HlmCarouselComponent, HlmCarouselContentComponent, HlmCarouselItemComponent, HlmCarouselNextComponent, HlmCarouselPreviousComponent } from '@spartan-ng/ui-carousel-helm';
import { PostFormComponent } from '../post-form/post-form.component';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events/events.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PhotosService } from '../../services/photos.service';
import { PostsService } from '../../services/posts/posts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    HlmCarouselComponent, 
    HlmCarouselContentComponent, 
    HlmCarouselItemComponent,
    HlmCarouselNextComponent,
    HlmCarouselPreviousComponent,
    PostFormComponent,
    CommonModule
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  activeRoute = inject(ActivatedRoute);
  eventsService = inject(EventsService);
  photosService = inject(PhotosService);
  postService = inject(PostsService);

  post = this.postService.currentPostData;
  images = computed(() => this.photosService.selectedPhotos().map(photo => photo.url));

  constructor() { 
    this.activeRoute.params.pipe(takeUntilDestroyed()).subscribe(params => {
      const { eventId, postId } = params;
      this.eventsService.changeEvent$.next(eventId);
      this.postService.changePost$.next(postId);
    });
  }
}
