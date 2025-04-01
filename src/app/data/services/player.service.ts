import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
export interface Player {
  numero_documento: number;
  apellido: string;
  nombre: string;
  apodo: string;
  fecha_nacimiento: string;
}
@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private dataUrl = '/players.json';
  private http = inject(HttpClient);

  getAllPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.dataUrl);
  }
}
