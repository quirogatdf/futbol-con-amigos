import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Trophy } from 'lucide-angular';
@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [LucideAngularModule, RouterLink],
})
export class HeaderComponent {
  readonly Trophy = Trophy;
}
