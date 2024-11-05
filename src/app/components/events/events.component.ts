import { Component, signal } from '@angular/core';
import { EventsService } from '../../services/events/events.service';
import { CommonModule } from '@angular/common';
import { Event } from '../../models/event.model';

import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { lucidePlus } from '@ng-icons/lucide';
import { provideIcons } from '@ng-icons/core';
import { HlmCardContentDirective, HlmCardDescriptionDirective, HlmCardDirective, HlmCardHeaderDirective, HlmCardTitleDirective } from '@spartan-ng/ui-card-helm';
import { BrnDialogContentDirective, BrnDialogTriggerDirective } from '@spartan-ng/ui-dialog-brain';
import { HlmDialogComponent, HlmDialogContentComponent, HlmDialogDescriptionDirective, HlmDialogFooterComponent, HlmDialogHeaderComponent, HlmDialogTitleDirective } from '@spartan-ng/ui-dialog-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,

    ReactiveFormsModule
  ],
  providers: [provideIcons({ lucidePlus })],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  events = signal<Event[]>([])

  form: FormGroup;

  constructor(private eventsService: EventsService, private router: Router) {
    this.events = this.eventsService.events;
    this.form = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
    });
  }

  createEvent() {
    const event = this.form.value;
    this.eventsService.createEvent(event).subscribe((event: any) => {
      this.events.set([...this.events(), event]);
    });
  }

  navigateToEventPhotos(eventId: string) {
    this.router.navigate(['/events', eventId, 'photos']);
  }
}
