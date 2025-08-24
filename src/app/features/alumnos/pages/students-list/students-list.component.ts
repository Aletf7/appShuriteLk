import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentCardComponent } from 'src/app/shared/ui/student-card/student-card.component';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [CommonModule, StudentCardComponent],
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent {
students = [
  {
    nombre: 'Lucía',
    edad: 20,
    cinturon: 'Verde',
    imagenUrl: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    nombre: 'Carlos',
    edad: 22,
    cinturon: 'Azul',
    imagenUrl: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    nombre: 'Marta',
    edad: 19,
    cinturon: 'Negro',
    imagenUrl: 'https://randomuser.me/api/portraits/women/3.jpg'
  }
];

}
