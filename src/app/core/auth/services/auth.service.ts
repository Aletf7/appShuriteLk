import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(null);

  login(username: string, password: string): boolean {
    // Simulación de login con cinturón incluido
    if (username === 'admin' && password === '1234') {
      this.currentUser.set({ username, role: 'admin', name: 'Administrador', belt: 'negro' });
      return true;
    }

    if (username === 'student' && password === '1234') {
      this.currentUser.set({ username, role: 'student', name: 'Estudiante', belt: 'blanco' });
      return true;
    }

    return false;
  }

  logout(): void {
    this.currentUser.set(null);
  }

  // ✅ Nuevo método para acceder al signal directamente
  getCurrentUserSignal() {
    return this.currentUser;
  }

  // ✅ Acceso directo al valor actual
  getUser(): User | null {
    return this.currentUser();
  }

  getUserName(): string | null {
    return this.currentUser()?.name ?? null;
  }

  getRole(): 'admin' | 'student' | null {
    return this.currentUser()?.role ?? null;
  }

  getBelt(): string | null {
    return this.currentUser()?.belt ?? null;
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }
}
