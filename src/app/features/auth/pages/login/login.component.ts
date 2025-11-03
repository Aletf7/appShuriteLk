import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/core/auth/services/auth.service';

@Component({
  selector: 'app-login',
    standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginPage {
  username = '';
  password = '';

  constructor(private router: Router, private authService: AuthService) {}

  onLogin() {
    const success = this.authService.login(this.username, this.password);

    if (success) {
      this.router.navigate(['/students']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
  
}
