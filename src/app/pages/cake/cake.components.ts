import { Component } from '@angular/core';
import { LucideAngularModule, Cake, Calendar } from 'lucide-angular';
@Component({
  selector: 'app-cake',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './cake.component.html',
})
export class CakeComponent {
  readonly Cake = Cake;
  readonly Calendar = Calendar;
}
