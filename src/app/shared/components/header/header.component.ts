import { Component } from '@angular/core';
import { LucideAngularModule, Trophy } from 'lucide-angular';
@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [LucideAngularModule],
})
export class HeaderComponent {
  readonly Trophy = Trophy;
}
