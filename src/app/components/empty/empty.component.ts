import { Component } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { lucideXSquare } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCardDirective } from '@spartan-ng/ui-card-helm';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';

@Component({
  selector: 'app-empty',
  standalone: true,
  imports: [
    HlmCardDirective,
    HlmIconComponent,
    HlmButtonDirective
  ],
  providers: [provideIcons({ lucideXSquare})],
  templateUrl: './empty.component.html',
  styleUrl: './empty.component.scss'
})
export class EmptyComponent {
  
}
