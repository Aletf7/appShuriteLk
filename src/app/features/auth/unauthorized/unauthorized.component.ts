import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="unauthorized-container">
      <h1>🚫 Acceso denegado</h1>
      <p>No tienes permisos para ver esta página.</p>
      <a routerLink="/">Volver al inicio</a>
    </div>
  `,
  styles: [`
    .unauthorized-container {
      text-align: center;
      margin-top: 100px;
      font-family: Arial, sans-serif;
    }

    .unauthorized-container h1 {
      font-size: 2.5rem;
      color: #d32f2f;
    }

    .unauthorized-container p {
      font-size: 1.2rem;
      margin: 20px 0;
    }

    .unauthorized-container a {
      text-decoration: none;
      color: #1976d2;
      font-weight: bold;
    }
  `]
})
export class UnauthorizedComponent {}
