import { Component, signal, OnInit } from '@angular/core';

const STORAGE_KEY = 'resultados_data';
const TTL_MS = 24 * 60 * 60 * 1000; // 24 horas

interface StoredData {
  date: string;
  counters: { black: number; green: number; white: number };
  savedAt: number;
}

@Component({
  selector: 'app-resultados',
  standalone: true,
  templateUrl: './resultados.component.html',
  styles: [`
    input[type="date"]::-webkit-calendar-picker-indicator {
      display: none;
    }
    input[type="date"] {
      -webkit-appearance: none;
      appearance: none;
    }
  `],
})
export class ResultadosComponent implements OnInit {
  activeView = signal<'cargar' | 'historial'>('cargar');

  selectedDate = signal('');

  counters = signal({
    black: 0,
    green: 0,
    white: 0,
  });

  ngOnInit(): void {
    if (typeof window === 'undefined') return;

    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const stored: StoredData = JSON.parse(raw);
        if (Date.now() - stored.savedAt <= TTL_MS) {
          this.selectedDate.set(stored.date);
          this.counters.set(stored.counters);
          return;
        }
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    // Default: hoy
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.selectedDate.set(`${yyyy}-${mm}-${dd}`);
  }

  private persist(): void {
    if (typeof window === 'undefined') return;

    const data: StoredData = {
      date: this.selectedDate(),
      counters: this.counters(),
      savedAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  selectView(view: 'cargar' | 'historial'): void {
    this.activeView.set(view);
  }

  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedDate.set(input.value);
    this.persist();
  }

  incrementar(column: 'black' | 'green' | 'white'): void {
    this.counters.update((c) => ({
      ...c,
      [column]: c[column] + 1,
    }));
    this.persist();
  }

  decrementar(column: 'black' | 'green' | 'white'): void {
    this.counters.update((c) => ({
      ...c,
      [column]: Math.max(0, c[column] - 1),
    }));
    this.persist();
  }

  getTally(column: 'black' | 'green' | 'white'): string {
    const count = this.counters()[column];
    return Array(count).fill('⚽').join(' ');
  }

  total = () =>
    this.counters().black + this.counters().green + this.counters().white;

  formatDate(): string {
    if (!this.selectedDate()) return '';
    const [year, month, day] = this.selectedDate().split('-');
    return `${day}/${month}/${year}`;
  }

  enviarWhatsApp(): void {
    if (!this.selectedDate()) {
      alert('Seleccioná una fecha antes de enviar');
      return;
    }

    const fecha = this.formatDate();
    const { black, green, white } = this.counters();
    const msg =
      `📊 *Resultados - ${fecha}*\n\n` +
      `⚫ Equipo Negro: *${black}*\n` +
      `🟢 Equipo Verde: *${green}*\n` +
      `⚪ Equipo Blanco: *${white}*\n\n` +
      `🔢 Partidos Totales: *${this.total()}*`;

    const url = `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }
}
