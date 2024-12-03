import { Component, effect, inject, signal } from '@angular/core';
import { Form, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { lucideGithub, lucideLoader2 } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCardDirective } from '@spartan-ng/ui-card-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		HlmButtonDirective,
        HlmCardDirective,
		HlmIconComponent,
		HlmInputDirective,
		HlmSpinnerComponent,
		ReactiveFormsModule,
		HlmLabelDirective,
	],
	providers: [provideIcons({ lucideGithub, lucideLoader2 })],
	templateUrl: './login.component.html', 
  host: {
    class: 'centered'
  }
})
export class LoginComponent {
	authService = inject(AuthService);
	router = inject(Router);
	isLoading = signal(false);

	authForm: FormGroup = new FormGroup({
		email: new FormControl(''),
		password: new FormControl(''),
	});

	constructor() {
		effect(() => {
			if (this.authService.user()) {
			  this.router.navigate(['events']);
			}
		});
	}

	send() {
		this.isLoading.set(true);
		this.authService.login(this.authForm.value)
	}
}