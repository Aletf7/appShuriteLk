import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(null);

  login(username: string, password: string): boolean {
    // Simulación de login
    if (username === 'admin' && password === '1234') {
      this.currentUser.set({ username, role: 'admin' });
      return true;
    }

    if (username === 'student' && password === '1234') {
      this.currentUser.set({ username, role: 'student' });
      return true;
    }

    return false;
  }

  logout() {
    this.currentUser.set(null);
  }

  getUser(): User | null {
    return this.currentUser();
  }
  getUserName(): string | null {
  return this.currentUser?.name ?? null;
}

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  getRole(): 'admin' | 'student' | null {
    return this.currentUser()?.role ?? null;
  }
}
