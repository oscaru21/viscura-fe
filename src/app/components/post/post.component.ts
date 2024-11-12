import { Component } from '@angular/core';
import { HlmCarouselComponent, HlmCarouselContentComponent, HlmCarouselItemComponent, HlmCarouselNextComponent, HlmCarouselPreviousComponent } from '@spartan-ng/ui-carousel-helm';
import { PostFormComponent } from '../post-form/post-form.component';

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
  images = ['http://localhost:8000/events/1/photos/29.png', 'http://localhost:8000/events/1/photos/15.png', 'http://localhost:8000/events/1/photos/13.png', 'http://localhost:8000/events/1/photos/11.png'];
  items = Array.from({ length: 5}, (_, i) => i + 1);
}
