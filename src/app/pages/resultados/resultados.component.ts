import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

const STORAGE_KEY = 'resultados_data';
const TTL_MS = 24 * 60 * 60 * 1000;

interface StoredData {
  date: string;
  counters: { black: number; green: number; white: number };
  savedAt: number;
}

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultados.component.html',
})
export class ResultadosComponent implements OnInit {
  activeView = signal<'cargar' | 'historial'>('cargar');
  selectedDate = signal('');
  calendarOpen = signal(false);
  viewYear = signal(2026);
  viewMonth = signal(0);
  counters = signal({ black: 0, green: 0, white: 0 });

  ngOnInit(): void {
    if (typeof window === 'undefined') return;

    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const stored: StoredData = JSON.parse(raw);
        if (stored.date && stored.counters && Date.now() - stored.savedAt <= TTL_MS) {
          this.selectedDate.set(stored.date);
          this.counters.set(stored.counters);
          const parts = stored.date.split('-');
          if (parts.length === 3) {
            this.viewYear.set(parseInt(parts[0], 10));
            this.viewMonth.set(parseInt(parts[1], 10) - 1);
          } else {
            this.setToday();
          }
        } else {
          localStorage.removeItem(STORAGE_KEY);
          this.setToday();
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
        this.setToday();
      }
    } else {
      this.setToday();
    }
  }

  setToday(): void {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth();
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    this.selectedDate.set(`${y}-${mm}-${dd}`);
    this.viewYear.set(y);
    this.viewMonth.set(m);
  }

  persist(): void {
    if (typeof window === 'undefined') return;
    const data: StoredData = {
      date: this.selectedDate(),
      counters: this.counters(),
      savedAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  toggleCalendar(): void {
    this.calendarOpen.update((v) => !v);
  }

  closeCalendar(): void {
    this.calendarOpen.set(false);
  }

  prevMonth(): void {
    if (this.viewMonth() === 0) {
      this.viewMonth.set(11);
      this.viewYear.update((y) => y - 1);
    } else {
      this.viewMonth.update((m) => m - 1);
    }
  }

  nextMonth(): void {
    if (this.viewMonth() === 11) {
      this.viewMonth.set(0);
      this.viewYear.update((y) => y + 1);
    } else {
      this.viewMonth.update((m) => m + 1);
    }
  }

  selectDay(day: number): void {
    const mm = String(this.viewMonth() + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    this.selectedDate.set(`${this.viewYear()}-${mm}-${dd}`);
    this.calendarOpen.set(false);
    this.persist();
  }

  getMonthLabel(): string {
    const m = this.viewMonth();
    const y = this.viewYear();
    const names = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
    return names[m] + ' ' + y;
  }

  getDays(): (number | null)[] {
    const y = this.viewYear();
    const m = this.viewMonth();
    const first = new Date(y, m, 1).getDay();
    const total = new Date(y, m + 1, 0).getDate();
    const result: (number | null)[] = [];
    for (let i = 0; i < first; i++) result.push(null);
    for (let i = 1; i <= total; i++) result.push(i);
    return result;
  }

  isSelected(day: number): boolean {
    const mm = String(this.viewMonth() + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return this.selectedDate() === `${this.viewYear()}-${mm}-${dd}`;
  }

  isToday(day: number): boolean {
    const now = new Date();
    return day === now.getDate() && this.viewMonth() === now.getMonth() && this.viewYear() === now.getFullYear();
  }

  incrementar(col: 'black' | 'green' | 'white'): void {
    this.counters.update((c) => ({ ...c, [col]: c[col] + 1 }));
    this.persist();
  }

  decrementar(col: 'black' | 'green' | 'white'): void {
    this.counters.update((c) => ({ ...c, [col]: Math.max(0, c[col] - 1) }));
    this.persist();
  }

  selectView(view: 'cargar' | 'historial'): void {
    this.activeView.set(view);
  }

  getTally(col: 'black' | 'green' | 'white'): string {
    return Array(this.counters()[col]).fill('⚽').join(' ');
  }

  total(): number {
    return this.counters().black + this.counters().green + this.counters().white;
  }

  formatDate(): string {
    const d = this.selectedDate();
    if (!d) return '';
    const p = d.split('-');
    return p.length === 3 ? `${p[2]}/${p[1]}/${p[0]}` : '';
  }

  enviarWhatsApp(): void {
    if (!this.selectedDate()) {
      alert('Seleccioná una fecha antes de enviar');
      return;
    }
    const fecha = this.formatDate();
    const c = this.counters();
    const msg =
      `📊 *Resultados - ${fecha}*\n\n` +
      `⚫ Equipo Negro: *${c.black}*\n` +
      `🟢 Equipo Verde: *${c.green}*\n` +
      `⚪ Equipo Blanco: *${c.white}*\n\n` +
      `🔢 Partidos Totales: *${this.total()}*`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  }
}
