import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TabItem } from '../../../core/tab-item.model';
import { LucideAngularModule, Medal, Star, Users } from 'lucide-angular';
@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
})
export class TabsComponent {
  readonly Star = Star;
  readonly Medal = Medal;
  readonly Users = Users;
  @Input() tabs: TabItem[] = [];
  @Input() selectedTab: string = 'players';
  @Output() selectedTabChange = new EventEmitter<string>();

  selectTab(value: string): void {
    this.selectedTab = value;
    this.selectedTabChange.emit(value);
  }
}
