import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../services/auth-service/auth-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  roleType: string = '';
  emailId: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    if (this.authService.isUserAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  signUp() {
    this.router.navigate(['/signUp']);
  }

  onLoginClick() {
    this.authService.login({
      roleType: this.roleType,
      emailId: this.emailId,
      password: this.password,
    });
  }
}
