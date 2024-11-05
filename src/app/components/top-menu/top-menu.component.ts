import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
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
		HlmMenuBarItemDirective
	],
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
}