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
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';
import { HlmAlertDirective } from '@spartan-ng/ui-alert-helm';
import { toast } from 'ngx-sonner';
import { catchError, of } from 'rxjs';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		HlmButtonDirective,
        HlmCardDirective,
		HlmIconComponent,
		HlmInputDirective,
		HlmAlertDirective,
		HlmSpinnerComponent,
		ReactiveFormsModule,
		HlmLabelDirective,
		HlmToasterComponent,
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
		this.authService.login(this.authForm.value).pipe(
			catchError(() => {
				this.isLoading.set(false);
				this.showError();
				return of(null);
			})
		).subscribe(() => {
			this.isLoading.set(false);
		});
	}

	showError() {
		toast('Error Login', {
		  description: 'Email or password is incorrect',
		})
	}
}