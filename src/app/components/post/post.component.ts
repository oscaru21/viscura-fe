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
  items = Array.from({ length: 5}, (_, i) => i + 1);
}
