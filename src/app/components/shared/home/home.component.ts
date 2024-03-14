import { Component, inject } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { DataServiceService } from '../../../services/data-service/data-service.service';
import { GendersMap, RolesTypeMap } from '../../../constants/AppConstant';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast-service/toast.service';
import { AuthServiceService } from '../../../services/auth-service/auth-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  userData: any;
  rolesTypeMap: any = RolesTypeMap;
  gendersMap: any = GendersMap;
  isLoaded: boolean = false;
  toastService = inject(ToastService);
  constructor(
    private dataService: DataServiceService,
    private router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.dataService
      .getCustomer(this.authService.getUserDetails().userId)
      .subscribe((data) => {
        console.log('data', data);
        this.userData = data;
        this.isLoaded = true;
      });
  }

  editUserDetails() {
    this.router.navigate([`/edit/${1}`]);
  }
}
