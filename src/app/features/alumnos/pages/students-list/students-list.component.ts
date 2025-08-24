import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../models/student.model';
import { StudentsService } from '../../services/students.service';
import { CommonModule } from '@angular/common';
import { StudentCardComponent } from 'src/app/shared/ui/student-card/student-card.component';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [CommonModule, StudentCardComponent],
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {
  students$!: Observable<Student[]>;

  constructor(private studentsService: StudentsService) {}

  ngOnInit(): void {
    this.students$ = this.studentsService.getStudents();
  }

  editStudent(id: number): void {
    // You can add routing or modal logic here
    console.log(`Editing student with ID: ${id}`);
  }

  deleteStudent(id: number): void {
    this.studentsService.deleteStudent(id).subscribe(() => {
      this.students$ = this.studentsService.getStudents(); // Refresh list
    });
  }
}
