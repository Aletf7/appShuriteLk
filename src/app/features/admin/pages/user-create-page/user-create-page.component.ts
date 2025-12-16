import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './user-create-page.component.html',
  styleUrls: ['./user-create-page.component.scss'],
})
export class UserCreatePageComponent {
  userForm: FormGroup;
  beltOptions = [
    'Blanco',
    'Blanco-Amarillo',
    'Amarillo',
    'Amarillo-Naranja',
    'Naranja',
    'Naranja-Verde',
    'Verde',
    'Verde-Azul',
    'Azul',
    'Azul-Marrón',
    'Marrón',
    'Negro',
    'Negro 1ºDAN',
    'Negro 2ºDAN',
    'Negro 3ºDAN',
    'Negro 4ºDAN',
    'Negro 5ºDAN',
    'Negro 6ºDAN',
  ];
  roleOptions = ['student', 'admin'];
  editMode = false;
  userId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      role: ['', Validators.required],
      belt: ['', Validators.required],
      centro: [''],
    });
  }
  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const user = navigation?.extras.state?.['user'];

    if (user) {
      this.userForm.patchValue(user);
      this.editMode = true;
      this.userId = user.id;
    }
  }

  submit(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;

      if (this.editMode && this.userId !== null) {
        this.http
          .put(`http://localhost:3000/students/${this.userId}`, userData)
          .subscribe(() => {
            this.snackBar.open('Usuario actualizado correctamente', 'Cerrar', {
              duration: 3000,
            });
            this.router.navigate(['/admin/students']);
          });
      } else {
        this.http
          .post('http://localhost:3000/students', userData)
          .subscribe(() => {
            this.snackBar.open('Usuario creado correctamente', 'Cerrar', {
              duration: 3000,
            });
            this.userForm.reset();
          });
      }
    }
  }
}
