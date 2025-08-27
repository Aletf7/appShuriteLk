import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-student-edit-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss'],
})
export class StudentEditComponent {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);
  private fb = inject(FormBuilder);

  studentId = this.route.snapshot.params['id'];
  studentForm!: FormGroup;
  previewUrl: string | null = null;
  selectedFile: File | null = null;

  ngOnInit() {
    const API_BASE = 'http://localhost:3000';

    this.http
      .get(`${API_BASE}/students/${this.studentId}`)
      .subscribe((student: any) => {
        this.studentForm = this.fb.group({
          name: [student.name, Validators.required],
          age: [student.age, [Validators.required, Validators.min(1)]],
          belt: [student.belt, Validators.required],
          imageUrl: [student.imageUrl],
        });
      });
  }
  
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.previewUrl = URL.createObjectURL(file);
    }
  }

  submit(): void {
    const API_BASE = 'http://localhost:3000';

    if (this.studentForm.valid) {
      const studentData = {
        ...this.studentForm.value,
        imageUrl: this.selectedFile
          ? 'assets/images/' + this.selectedFile.name
          : this.studentForm.value.imageUrl,
      };

      this.http
        .put(`${API_BASE}/students/${this.studentId}`, studentData)
        .subscribe(() => {
          alert('Estudiante actualizado correctamente');
        });
    }
  }
}
