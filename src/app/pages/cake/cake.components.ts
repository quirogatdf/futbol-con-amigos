import { Component } from '@angular/core';
import { LucideAngularModule, Cake } from 'lucide-angular';
@Component({
  selector: 'app-cake',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './cake.component.html',
})
export class CakeComponent {
  readonly Cake = Cake;
}
