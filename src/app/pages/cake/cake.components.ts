import { Component, inject, OnInit } from '@angular/core';
import { LucideAngularModule, Cake, Calendar } from 'lucide-angular';
import { Player, PlayerService } from '../../data/services/player.service';
import { BirthdayTodayPipe } from '../../shared/pipes/birthday-today.pipe';
import { AgePipe } from '../../shared/pipes/age.pipe';
import { DaysUntilPipe } from '../../shared/pipes/days-until.pipe';
@Component({
  selector: 'app-cake',
  standalone: true,
  imports: [LucideAngularModule, BirthdayTodayPipe, AgePipe, DaysUntilPipe],
  templateUrl: './cake.component.html',
})
export class CakeComponent implements OnInit {
  readonly Cake = Cake;
  readonly Calendar = Calendar;
  private playerService = inject(PlayerService);
  players: Player[] = [];
  hoy = new Date().getDate();

  ngOnInit(): void {
    this.playerService.getAllPlayers().subscribe({
      next: (data) => {
        this.players = data;
      },
    });
  }
  calculateDayDifference(date: string): number {
    const [dia, _mes] = date.split('/');
    const timeDiff: number = Number(dia) - this.hoy;
    console.log(timeDiff);
    return timeDiff;
  }
}
