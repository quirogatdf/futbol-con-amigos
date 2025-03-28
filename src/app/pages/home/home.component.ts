import { Component } from '@angular/core';
import { LucideAngularModule, Star, User, Medal } from 'lucide-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [LucideAngularModule],
})
export class HomeComponent {
  readonly Users = User;
  readonly Medal = Medal;
  readonly Star = Star;
}
