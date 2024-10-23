import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import {
	HlmMenuBarComponent,
	HlmMenuBarItemDirective,
	HlmMenuComponent,
	HlmMenuGroupComponent,
	HlmMenuItemDirective,
} from '@spartan-ng/ui-menu-helm';

@Component({
	selector: 'top-menu',
	standalone: true,
	host: {
		class: 'block',
	},
	imports: [
		BrnMenuTriggerDirective,
		HlmMenuComponent,
		HlmMenuBarComponent,
		HlmMenuItemDirective,
		HlmMenuBarItemDirective,
		HlmMenuGroupComponent,
		HlmButtonDirective
	],
	templateUrl: './top-menu.component.html',
})
export class TopMenuComponent {
  router = inject(Router);

  redirectToPhotos() {
    this.router.navigate(['/photos']);
  }
}