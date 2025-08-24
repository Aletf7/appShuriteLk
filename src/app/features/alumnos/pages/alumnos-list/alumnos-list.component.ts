import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnoCardComponent } from 'src/app/shared/ui/alumno-card/alumno-card.component';

@Component({
  selector: 'app-alumnos-list',
  standalone: true,
  imports: [CommonModule, AlumnoCardComponent],
  templateUrl: './alumnos-list.component.html',
  styleUrls: ['./alumnos-list.component.scss']
})
export class AlumnosListComponent {
  alumnos = [
    { nombre: 'Lucía', edad: 20 },
    { nombre: 'Carlos', edad: 22 },
    { nombre: 'Marta', edad: 19 }
  ];
}
