import { Component, computed, signal } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideBrain, lucideCheck, lucideChevronDown, lucideEdit2, lucideLoader2, lucidePlus, lucideSparkles } from '@ng-icons/lucide';
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
import { HlmDialogComponent, HlmDialogContentComponent, HlmDialogFooterComponent, HlmDialogHeaderComponent, HlmDialogTitleDirective } from '@spartan-ng/ui-dialog-helm';
import { BrnDialogContentDirective, BrnDialogTriggerDirective } from '@spartan-ng/ui-dialog-brain';

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
    FeedbackComponent,

    BrnDialogTriggerDirective,
    BrnDialogContentDirective,

    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
  ],
  providers: [provideIcons({ lucideEdit2, lucideBrain, lucidePlus, lucideSparkles, lucideLoader2 })],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss'
})
export class PostFormComponent {
  tags = signal(['cars', 'ferrari', 'showcase', 'red', 'fast', 'luxury']);
  MAX_TAGS = 5;
  displayTags = computed(() => this.tags().slice(0, this.MAX_TAGS));

  isLoading = signal(false);
  isEditing = signal(false);

  content = signal('');

  generateContent(ctx: any) {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
      this.content.set("🏁🔥 Rev Up Your Engines! 🔥🏁 \n Get ready for the ultimate race car showdown! 🏎️💨 The engines are roaring, the track is set, and adrenaline is running high! 💥 Don't miss out on the most thrilling event of the year. 🏁");
      ctx.close();
    }, 5000);
  }

  updateContent(text: string) {
    this.content.set(text);
  }

  toggleEditing() {
    this.isEditing.set(!this.isEditing());
  }
}
