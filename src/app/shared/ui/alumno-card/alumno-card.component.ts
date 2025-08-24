import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alumno-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alumno-card.component.html',
  styleUrls: ['./alumno-card.component.scss']
})
export class AlumnoCardComponent {
  @Input() alumno!: { nombre: string; edad: number };
}
