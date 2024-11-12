import { Component, computed, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideBrain, lucideCheck, lucideChevronDown, lucideEdit2, lucidePlus } from '@ng-icons/lucide';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCardContentDirective, HlmCardDescriptionDirective, HlmCardDirective, HlmCardFooterDirective, HlmCardHeaderDirective, HlmCardTitleDirective } from '@spartan-ng/ui-card-helm';
import { HlmCommandImports } from '@spartan-ng/ui-command-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmPopoverContentDirective } from '@spartan-ng/ui-popover-helm';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { FeedbackComponent } from '../feedback/feedback.component';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [
    HlmCommandImports,
    HlmIconComponent,
    HlmPopoverContentDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmCardFooterDirective,
    HlmButtonDirective,
    HlmBadgeDirective,
    HlmSeparatorDirective,
    FeedbackComponent
  ],
  providers: [provideIcons({ lucideEdit2, lucideBrain, lucidePlus })],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss'
})
export class PostFormComponent {
  tags = signal(['cars', 'ferrari', 'showcase', 'red', 'fast', 'luxury']);
  MAX_TAGS = 5;
  displayTags = computed(() => this.tags().slice(0, this.MAX_TAGS));
}
