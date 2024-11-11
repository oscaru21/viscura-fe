import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { lucideGithub, lucideLoader2 } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCardDirective } from '@spartan-ng/ui-card-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [
		HlmButtonDirective,
    HlmCardDirective,
		HlmIconComponent,
		HlmInputDirective,
		HlmSpinnerComponent,
		FormsModule,
		HlmLabelDirective,
	],
	providers: [provideIcons({ lucideGithub, lucideLoader2 })],
	templateUrl: './home.component.html', 
  styleUrl: './home.component.scss',
  host: {
    class: 'centered'
  }
})
export class HomeComponent {
	isLoading = signal(false);

	send() {
		this.isLoading.set(true);
		setTimeout(() => this.isLoading.set(false), 3000);
	}
}