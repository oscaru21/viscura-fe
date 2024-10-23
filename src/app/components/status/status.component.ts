import { Component, Input } from '@angular/core';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideX } from '@ng-icons/lucide';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [
    HlmIconComponent
  ],
  providers: [provideIcons({ lucideCheck, lucideX })],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {
  @Input() status: 'success' | 'error' | undefined;
}
