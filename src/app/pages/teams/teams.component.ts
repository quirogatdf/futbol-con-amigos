import { Component, OnInit } from '@angular/core';
import { Team } from '../../core/models/team.model';
@Component({
  selector: 'app-teams',
  standalone: true,
  templateUrl: './teams.component.html',
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [
    {
      id: 1,
      name: 'Equipo Negro',
      class: 'w-6 h-6 rounded-full border-4 !border-gray-400 bg-black',
      won: 7,
      drawn: 1,
    },
    {
      id: 2,
      name: 'Equipo Verde',
      class: 'w-6 h-6 rounded-full border-4 !border-green-200 bg-green-500',
      won: 6,
      drawn: 2,
    },
    {
      id: 2,
      name: 'Equipo Blanco',
      class: 'w-6 h-6 rounded-full border-4 !border-gray-100 bg-white',
      won: 7,
      drawn: 3,
    },
  ];

  ngOnInit(): void {
    this.sortData();
  }
  sortedTeams: Team[] = [];
  sortData(): void {
    this.sortedTeams = [...this.teams].sort((a, b) => {
      const scoreA = a.won * 2 + a.drawn;
      const scoreB = b.won * 2 + b.drawn;

      // Orden descendente (mayor puntuación primero)
      return scoreB - scoreA;
    });
  }
}
