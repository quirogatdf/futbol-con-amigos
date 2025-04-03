import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysUntil',
  standalone: true,
})
export class DaysUntilPipe implements PipeTransform {
  transform(players: any[]): any[] {
    const hoy = new Date();
    return players.filter((player) => {
      const [_dia, mes] = player.fecha_nacimiento.split('/');

      return _dia > hoy.getDate() && hoy.getMonth() + 1 === +mes;
    });
  }
}
