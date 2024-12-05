import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { lucideGithub, lucideLoader2 } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCardDirective } from '@spartan-ng/ui-card-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import { AuthService } from '../auth.service';
import { RegisterUserRequest } from '../../models/credentials.model';
import { catchError, first, of } from 'rxjs';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [
		HlmButtonDirective,
        HlmCardDirective,
		HlmIconComponent,
		HlmInputDirective,
		HlmSpinnerComponent,
		ReactiveFormsModule,
		HlmLabelDirective,
		BrnSelectImports, 
		HlmSelectImports
	],
	providers: [provideIcons({ lucideGithub, lucideLoader2 })],
	templateUrl: './register.component.html', 
  host: {
    class: 'centered'
  }
})
export class RegisterComponent {
	authService = inject(AuthService);
	isLoading = signal(false);

	registerForm: FormGroup;

	constructor(private fb: FormBuilder) {
		this.registerForm = this.fb.group({
		  first_name: ['', Validators.required],
		  last_name: ['', Validators.required],
		  email: ['', [Validators.required, Validators.email]],
		  password: ['', Validators.required],
		  roles: ['', Validators.required]
		});
	  }

	send() {
		const registerRequest: RegisterUserRequest = this.registerForm.value;
		registerRequest.roles = [this.registerForm.value.roles];
		this.isLoading.set(true);
		this.authService.createAccount(registerRequest).pipe(
			first(),
			catchError((error) => {
			  this.isLoading.set(false);
			  return of(error);
			})
		).subscribe(() => {
		  this.isLoading.set(false);
		});
	  }
}