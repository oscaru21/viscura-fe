import { Component, inject } from '@angular/core';
import { HlmCarouselComponent, HlmCarouselContentComponent, HlmCarouselItemComponent, HlmCarouselNextComponent, HlmCarouselPreviousComponent } from '@spartan-ng/ui-carousel-helm';
import { PostFormComponent } from '../post-form/post-form.component';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../services/events/events.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    HlmCarouselComponent, 
    HlmCarouselContentComponent, 
    HlmCarouselItemComponent,
    HlmCarouselNextComponent,
    HlmCarouselPreviousComponent,
    PostFormComponent
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  activeRoute = inject(ActivatedRoute);
  eventsService = inject(EventsService);

  images = ['http://localhost:8000/events/1/photos/49.png', 'http://localhost:8000/events/1/photos/11.png', 'http://localhost:8000/events/1/photos/21.png', 'http://localhost:8000/events/1/photos/47.png'];
  items = Array.from({ length: 5}, (_, i) => i + 1);

  constructor() { 
    this.activeRoute.params.pipe(takeUntilDestroyed()).subscribe(params => {
      this.eventsService.changeEvent$.next(params['eventId']);
    });
  }
}
