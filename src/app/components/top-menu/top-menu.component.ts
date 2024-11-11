import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideHardDrive } from '@ng-icons/lucide';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import {
	HlmMenuBarComponent,
	HlmMenuBarItemDirective
} from '@spartan-ng/ui-menu-helm';

@Component({
	selector: 'top-menu',
	standalone: true,
	host: {
		class: 'block',
	},
	imports: [
		HlmMenuBarComponent,
		HlmMenuBarItemDirective,
		HlmIconComponent
	],
	providers: [provideIcons({ lucideHardDrive })],
	templateUrl: './top-menu.component.html',
})
export class TopMenuComponent {
  router = inject(Router);

  redirectToPhotos() {
    this.router.navigate(['/photos']);
  }

  redirectToEvents() {
	this.router.navigate(['/events']);
  }

  redirectToHome() {
	this.router.navigate(['/']);
  }
}