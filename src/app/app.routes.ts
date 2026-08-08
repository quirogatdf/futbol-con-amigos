import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';
import { ResultadosComponent } from './pages/resultados/resultados.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'resultados', component: ResultadosComponent },
  { path: '**', redirectTo: '' },
];
