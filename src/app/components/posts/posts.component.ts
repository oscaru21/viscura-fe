import { Component, inject, signal } from '@angular/core';
import { EventsService } from '../../services/events/events.service';
import { CommonModule } from '@angular/common';

import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { lucideLoader2, lucidePlus } from '@ng-icons/lucide';
import { provideIcons } from '@ng-icons/core';
import { HlmCardContentDirective, HlmCardDescriptionDirective, HlmCardDirective, HlmCardHeaderDirective, HlmCardTitleDirective } from '@spartan-ng/ui-card-helm';
import { BrnDialogContentDirective, BrnDialogTriggerDirective } from '@spartan-ng/ui-dialog-brain';
import { HlmDialogComponent, HlmDialogContentComponent, HlmDialogDescriptionDirective, HlmDialogFooterComponent, HlmDialogHeaderComponent, HlmDialogTitleDirective } from '@spartan-ng/ui-dialog-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { BrnContextMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { HlmMenuComponent, HlmMenuItemDirective } from '@spartan-ng/ui-menu-helm';
import { PostsService } from '../../services/posts/posts.service';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    CommonModule, 
    HlmIconComponent, 
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardContentDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,

    BrnDialogTriggerDirective,
    BrnDialogContentDirective,

    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,

    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,

    ReactiveFormsModule,
    HlmMenuComponent,
    HlmMenuItemDirective,
    BrnContextMenuTriggerDirective
    ],
  providers: [provideIcons({ lucidePlus, lucideLoader2 })],
  templateUrl: './posts.component.html',
})
export class PostsComponent {
  authService = inject(AuthService);
  router = inject(Router);
  activeRoute = inject(ActivatedRoute);
  eventsService = inject(EventsService);
  postsService = inject(PostsService);
  posts = this.postsService.posts;

  eventId = Number(this.activeRoute.snapshot.paramMap.get('eventId'));


  constructor() {
    this.eventsService.getEvents().pipe(first()).subscribe();
    this.postsService.getPosts(this.eventId.toString()).pipe(first()).subscribe();
  }

  navigateToPost(postId?: string) {
    this.router.navigate(['events', this.eventId, 'posts', postId]);
  }
}
