import { Component, computed, Signal, signal } from '@angular/core';
import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { lucideSearch } from '@ng-icons/lucide';
import { HlmCommandInputWrapperComponent } from '@spartan-ng/ui-command-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { provideIcons } from '@ng-icons/core';
import { Photo } from '../../models/photo.model';
import { PhotoComponent } from '../photo/photo.component';
import { photos } from '../../models/mocks';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [
    FormsModule,
    HlmIconComponent,
    HlmCommandInputWrapperComponent,
    HlmInputDirective,
    HlmButtonDirective,
    BrnMenuTriggerDirective,

    PhotoComponent
  ],
  providers: [provideIcons({ lucideSearch })],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.scss'
})
export class PhotosComponent {
  photos = signal<Photo[]>([...photos,...photos,...photos,...photos]);

  searchQuery = signal<string>('');
  filteredPhotos = computed(() => {
    const query = this.searchQuery();
    return this.photos().filter(photo => photo.name.toLowerCase().includes(query.toLowerCase()));
  });
}
