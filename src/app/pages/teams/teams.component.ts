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
      class:
        'rounded-full w-6 h-6 aspect-square border-4 !border-gray-400 bg-black',
      won:
        7 +
        7 +
        9 +
        5 + //10-05
        5 + //17-05
        5 + //24-05
        2, //01-06
      drawn: 1 + 1, //10-05
    },
    {
      id: 2,
      name: 'Equipo Verde',
      class:
        'rounded-full w-6 h-6 aspect-square border-4 !border-green-200 bg-green-500',
      won:
        6 +
        2 +
        13 + //26-04
        4 + //10-05
        3 + //17-05
        9 + //24-05
        0, //01-06
      drawn: 2 + 5, //10-05
    },
    {
      id: 2,
      name: 'Equipo Blanco',
      class:
        'rounded-full w-6 h-6 aspect-square border-4 !border-gray-100 bg-white',
      won:
        7 +
        1 +
        7 +
        4 + //10-05
        9 + //17-05
        3, //24-05
      drawn: 3 + 4, //10-05
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
