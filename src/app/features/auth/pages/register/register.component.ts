import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentFormComponent } from 'src/app/shared/components/student-form/student-form.component';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, StudentFormComponent, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(data: any): void {
    const nuevoUsuario = {
      ...data,
      activo: false, // El admin debe activarlo manualmente
      role: 'user'
    };

    this.http.post('http://localhost:3000/users', nuevoUsuario).subscribe(() => {
      this.router.navigate(['/success']);
    });
  }
}
