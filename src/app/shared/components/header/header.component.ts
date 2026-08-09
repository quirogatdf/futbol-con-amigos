import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Trophy, Menu, X } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [LucideAngularModule, RouterLink],
})
export class HeaderComponent {
  readonly Trophy = Trophy;
  readonly Menu = Menu;
  readonly X = X;
  menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
