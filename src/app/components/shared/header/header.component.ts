import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../services/auth-service/auth-service.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthServiceService, private router: Router) {
    if (!this.authService.isUserAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {}

  getRoleType() {
    return this.authService.getUserDetails().roleType;
  }

  onLogoutClick() {
    this.authService.logout();
  }
}
