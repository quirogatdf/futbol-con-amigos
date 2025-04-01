import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'birthdayToday',
  standalone: true,
})
export class BirthdayTodayPipe implements PipeTransform {
  transform(players: any[]): any[] {
    const hoy = new Date();
    return players.filter((player) => {
      const [dia, mes] = player.fecha_nacimiento.split('/');
      return hoy.getDate() === +dia && hoy.getMonth() + 1 === +mes;
    });
  }
}
