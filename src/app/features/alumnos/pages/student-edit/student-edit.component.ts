import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { StudentFormComponent } from 'src/app/shared/components/student-form/student-form.component';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-student-edit-page',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    StudentFormComponent,
    RouterModule,
    MatInputModule,
  ],
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss'],
})
export class StudentEditComponent {
  constructor(private auth: AuthService) {}
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  studentId = this.route.snapshot.params['id'];
  initialData: any;
  isAdmin = false;
  belts: string[] = [
    'Blanco',
    'Amarillo',
    'Naranja',
    'Verde',
    'Azul',
    'Marrón',
    'Negro',
  ];

  ngOnInit() {
    const API_BASE = 'http://localhost:3000';
    this.isAdmin = this.auth.getRole() === 'admin'; // Asegúrate de tener AuthService inyectado

    this.http
      .get(`${API_BASE}/users/${this.studentId}`)
      .subscribe((student: any) => {
        this.initialData = student;
      });
  }

  onSubmit(updatedData: any): void {
    const API_BASE = 'http://localhost:3000';

    const datosCompletos = {
      ...this.initialData, // conserva todos los campos originales
      ...updatedData, // actualiza solo los modificados
    };

    this.http
      .put(`${API_BASE}/users/${this.studentId}`, datosCompletos)
      .subscribe(() => {
        alert('✅ Estudiante actualizado correctamente');
      });
  }
}
