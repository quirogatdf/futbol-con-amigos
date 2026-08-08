import { Component, signal, OnInit, computed } from '@angular/core';

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
  templateUrl: './resultados.component.html',
})
export class ResultadosComponent implements OnInit {
  activeView = signal<'cargar' | 'historial'>('cargar');

  selectedDate = signal('');

  // Calendar state
  calendarOpen = signal(false);
  viewYear = signal(new Date().getFullYear());
  viewMonth = signal(new Date().getMonth());

  counters = signal({
    black: 0,
    green: 0,
    white: 0,
  });

  monthName = computed(() => {
    const d = new Date(this.viewYear(), this.viewMonth());
    return d.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' });
  });

  calendarDays = computed(() => {
    const year = this.viewYear();
    const month = this.viewMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
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
          const [y, m] = stored.date.split('-').map(Number);
          this.viewYear.set(y);
          this.viewMonth.set(m - 1);
          return;
        }
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    this.setToday();
  }

  setToday(): void {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.selectedDate.set(`${yyyy}-${mm}-${dd}`);
    this.viewYear.set(yyyy);
    this.viewMonth.set(today.getMonth());
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

  isSelected(day: number): boolean {
    const mm = String(this.viewMonth() + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return this.selectedDate() === `${this.viewYear()}-${mm}-${dd}`;
  }

  isToday(day: number): boolean {
    const today = new Date();
    return (
      day === today.getDate() &&
      this.viewMonth() === today.getMonth() &&
      this.viewYear() === today.getFullYear()
    );
  }

  selectView(view: 'cargar' | 'historial'): void {
    this.activeView.set(view);
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
