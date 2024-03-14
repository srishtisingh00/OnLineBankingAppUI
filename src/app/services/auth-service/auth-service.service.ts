import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service/data-service.service';
import { ToastService } from '../toast-service/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private isAuthenticated: boolean = false;
  private userDetails: any = {};
  private toastService = inject(ToastService);
  constructor(private router: Router, private dataService: DataServiceService) {
    if (localStorage.getItem('isAuthenticated') === 'true') {
      this.isAuthenticated = true;
      this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '');
    }
  }

  public isUserAuthenticated() {
    return this.isAuthenticated;
  }

  public login(requestBody: any) {
    console.log(requestBody);
    this.dataService.getCustomers().subscribe(
      (customers) => {
        for (let customer of customers) {
          if (
            customer.roleTypeId == requestBody.roleType &&
            customer.email.toLowerCase() === requestBody.emailId.toLowerCase() &&
            customer.password === requestBody.password &&
            customer.statusID == 2
          ) {
            this.isAuthenticated = true;
            this.userDetails = { ...requestBody, userId: customer.customerID };
            localStorage.setItem(
              'userDetails',
              JSON.stringify(this.userDetails)
            );
            localStorage.setItem('isAuthenticated', 'true');
            this.router.navigate(['/home']);
            return;
          }
        }
        this.toastService.show({
          type: 'error',
          message:
            'Incorrect email or passwrod or Account has not been approved yet.',
        });
      },
      (err) => {
        this.toastService.show({
          type: 'error',
          message:
            'Incorrect email or passwrod or Account has not been approved yet.',
        });
      }
    );
  }

  public logout() {
    console.log('logging out');
    this.isAuthenticated = false;
    this.userDetails = {};
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public getUserDetails() {
    return this.userDetails;
  }
}
