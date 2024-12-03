import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { lucideHardDrive } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import {
	HlmMenuBarComponent,
	HlmMenuBarItemDirective
} from '@spartan-ng/ui-menu-helm';
import { AuthService } from '../../auth/auth.service';

@Component({
	selector: 'top-menu',
	standalone: true,
	host: {
		class: 'block',
	},
	imports: [
		HlmMenuBarComponent,
		HlmMenuBarItemDirective,
		HlmIconComponent,
		HlmButtonDirective
	],
	providers: [provideIcons({ lucideHardDrive })],
	templateUrl: './top-menu.component.html',
})
export class TopMenuComponent {
  router = inject(Router);
  authService = inject(AuthService);

  constructor() {
	effect(() => {
	  if (!this.authService.user()) {
		this.router.navigate(['auth', 'login']);
	  }
	});
  }

  redirectToPhotos() {
    this.router.navigate(['/photos']);
  }

  redirectToEvents() {
	this.router.navigate(['/events']);
  }

  redirectToHome() {
	this.router.navigate(['/']);
  }

  redirectToLogin() {
	this.router.navigate(['auth/login']);
  }

  redirectToRegister() {
	this.router.navigate(['auth/register']);
  }
}