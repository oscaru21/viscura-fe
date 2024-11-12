import { Component, computed, Input } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideMoreHorizontal } from '@ng-icons/lucide';
import { HlmAvatarComponent, HlmAvatarImageDirective } from '@spartan-ng/ui-avatar-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCardContentDirective, HlmCardDescriptionDirective, HlmCardDirective, HlmCardFooterDirective, HlmCardHeaderDirective, HlmCardTitleDirective } from '@spartan-ng/ui-card-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
import { Feedback } from '../../models/feedback.model';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [
    HlmButtonDirective,
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmIconComponent,
    HlmSwitchComponent,
    HlmAvatarImageDirective,
    HlmAvatarComponent,
    HlmIconComponent
  ],
  providers: [provideIcons({ lucideMoreHorizontal })],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {
  @Input({required: true}) feedback!: Feedback;
  date = computed(() => this.feedback.created_at?.split('T')[0]);
}
