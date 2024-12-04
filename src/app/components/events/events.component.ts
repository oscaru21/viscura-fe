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
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { BrnContextMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { HlmMenuComponent, HlmMenuItemDirective } from '@spartan-ng/ui-menu-helm';

@Component({
  selector: 'app-events',
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
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  authService = inject(AuthService);
  router = inject(Router);
  eventsService = inject(EventsService);
  events = this.eventsService.events;

  contextFile: File | null = null;

  form: FormGroup;

  isUploading = signal(false);

  constructor() {
    this.eventsService.getEvents().pipe(first()).subscribe();
    this.form = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
    });
  }

  createEvent(ctx: any) {
    this.isUploading.set(true);

    let formData: FormData | undefined;
    if(this.contextFile) {
      formData = new FormData();
      formData.append('files', this.contextFile, this.contextFile.name);
    }
    
    const event = this.form.value;
    this.eventsService.createEvent(event, formData).pipe(first()).subscribe((event: any) => {
      ctx.close();
      this.isUploading.set(false);
    });
  }

  navigateToEventPhotos(eventId: string) {
    this.router.navigate(['/events', eventId, 'photos']);
  }

  onFileSelect(event: any) {
    this.contextFile = event.target.files[0]; 
  }

  deleteEvent(eventId: string) {
    this.eventsService.deleteEvent(eventId).pipe(first()).subscribe();
  }
}
