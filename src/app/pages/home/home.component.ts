import { Component, signal } from '@angular/core';
import { TabItem } from '../../core/tab-item.model';
import { TabsComponent } from '../../shared/components/tabs/tabs.component';
import { TeamsComponent } from '../teams/teams.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [TabsComponent, TeamsComponent],
})
export class HomeComponent {
  selectedTab = signal('players');

  //Datos de pestaña
  tabItems = signal<TabItem[]>([
    { value: 'players', label: 'Jugadores', icon: 'Users' },
    { value: 'teams', label: 'Equipos', icon: 'Medal' },
    { value: 'mvp', label: 'MVP', icon: 'Star' },
  ]);

  updateSelectedTab(value: string): void {
    this.selectedTab.set(value);
  }
}
