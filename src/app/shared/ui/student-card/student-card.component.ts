import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss']
})
export class StudentCardComponent {
  @Input() student!: {
    nombre: string;
    edad: number;
    cinturon: string;
    imagenUrl: string;
  };

  editStudent() {
    console.log('Editar:', this.student.nombre);
    // Aquí se lanzara un modal o navegar a una vista de edición
  }

  deleteStudent() {
    console.log('Eliminar:', this.student.nombre);
    // Aquí se emitira un evento o llamar a un servicio
  }
}
