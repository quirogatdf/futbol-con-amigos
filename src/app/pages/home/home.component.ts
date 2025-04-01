import { Component, signal } from '@angular/core';
import { TabItem } from '../../core/tab-item.model';
import { TabsComponent } from '../../shared/components/tabs/tabs.component';
import { TeamsComponent } from '../teams/teams.component';
import { CakeComponent } from '../cake/cake.components';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [TabsComponent, TeamsComponent, CakeComponent],
})
export class HomeComponent {
  selectedTab = signal('players');

  //Datos de pestaña
  tabItems = signal<TabItem[]>([
    { value: 'players', label: 'Jugadores', icon: 'Users' },
    { value: 'teams', label: 'Equipos', icon: 'Medal' },
    { value: 'mvp', label: 'MVP', icon: 'Star' },
    { value: 'cake', label: 'Cumpleaños', icon: 'Cake' },
  ]);
  jugadores = [
    {
      numero_documento: 1,
      apellido: 'Cabana',
      nombre: 'Sergio',
      apodo: 'Checho',
      fecha_nacimiento: '18/04/1988',
    },
    {
      numero_documento: 2,
      apellido: 'Vera',
      nombre: 'Walter',
      apodo: 'De bruyne',
      fecha_nacimiento: '9/06/1997',
    },
    {
      numero_documento: 3,
      apellido: 'Rojas Peralta',
      nombre: 'Oscar Alberto',
      apodo: 'Chan',
      fecha_nacimiento: '13/04/1982',
    },
    {
      numero_documento: 4,
      apellido: 'Quiroga',
      nombre: 'Matias',
      apodo: 'Matias',
      fecha_nacimiento: '12/11/1995',
    },
    {
      numero_documento: 5,
      apellido: 'Quiroga',
      nombre: 'Paulino',
      apodo: 'Loco',
      fecha_nacimiento: '7/09/1971',
    },
    {
      numero_documento: 6,
      apellido: 'Quiroga',
      nombre: 'Damian',
      apodo: 'Poly',
      fecha_nacimiento: '23/02/1974',
    },
    {
      numero_documento: 7,
      apellido: 'Igarzabal',
      nombre: 'Matias',
      apodo: 'Negro',
      fecha_nacimiento: '8/09/2000',
    },
    {
      numero_documento: 8,
      apellido: 'Montaña',
      nombre: 'Matias',
      apodo: 'Matti',
      fecha_nacimiento: '17/05/2000',
    },
    {
      numero_documento: 9,
      apellido: 'Guaymas',
      nombre: 'Gabriel',
      apodo: 'Gabi',
      fecha_nacimiento: '1/04/1997',
    },
    {
      numero_documento: 10,
      apellido: 'Quiroga',
      nombre: 'Ceferino Ángel',
      apodo: 'Presi / Bochini',
      fecha_nacimiento: '25/03/0072',
    },
    {
      numero_documento: 11,
      apellido: 'Quiroga',
      nombre: 'Cristian',
      apodo: 'Patrón',
      fecha_nacimiento: '20/04/1994',
    },
    {
      numero_documento: 12,
      apellido: 'Jerez',
      nombre: 'Alvaro',
      apodo: 'MBAPPE',
      fecha_nacimiento: '7/03/2025',
    },
    {
      numero_documento: 29133343,
      apellido: 'Tolaba',
      nombre: 'Marcos',
      apodo: 'Peluboy',
      fecha_nacimiento: '7/03/1982',
    },
    {
      numero_documento: 39037612,
      apellido: 'Quiroga',
      nombre: 'Arnaldo Leonel',
      apodo: '',
      fecha_nacimiento: '9/07/1994',
    },
    {
      numero_documento: 38357104,
      apellido: 'Leaño',
      nombre: 'Efrainf',
      apodo: 'Dj efra',
      fecha_nacimiento: '3/06/1994',
    },
  ];
  updateSelectedTab(value: string): void {
    this.selectedTab.set(value);
  }
}
