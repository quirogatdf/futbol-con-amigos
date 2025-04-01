import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
  standalone: true,
})
export class AgePipe implements PipeTransform {
  transform(fechaNacimiento: string): number {
    const [dia, mes, anio] = fechaNacimiento.split('/');
    const nacimiento = new Date(`${mes}/${dia}/${anio}`);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const m = hoy.getMonth() - nacimiento.getMonth();

    return m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())
      ? edad - 1
      : edad;
  }
}
