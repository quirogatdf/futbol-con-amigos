import { Component, inject, OnInit } from '@angular/core';
import { LucideAngularModule, Cake, Calendar } from 'lucide-angular';
import { Player, PlayerService } from '../../data/services/player.service';
import { BirthdayTodayPipe } from '../../shared/pipes/birthday-today.pipe';
import { AgePipe } from '../../shared/pipes/age.pipe';
@Component({
  selector: 'app-cake',
  standalone: true,
  imports: [LucideAngularModule, BirthdayTodayPipe, AgePipe],
  templateUrl: './cake.component.html',
})
export class CakeComponent implements OnInit {
  readonly Cake = Cake;
  readonly Calendar = Calendar;
  private playerService = inject(PlayerService);
  players: Player[] = [];

  ngOnInit(): void {
    this.playerService.getAllPlayers().subscribe({
      next: (data) => {
        this.players = data;
      },
    });
  }
}
