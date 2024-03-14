import { Component, OnInit, inject } from '@angular/core';
import { DataServiceService } from '../../../services/data-service/data-service.service';
import { AuthServiceService } from '../../../services/auth-service/auth-service.service';
import { ToastService } from '../../../services/toast-service/toast.service';

@Component({
  selector: 'app-account-details',
  standalone: true,
  imports: [],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css',
})
export class AccountDetailsComponent implements OnInit {
  accountDetails: any;
  userId: number;
  toastService = inject(ToastService);
  constructor(
    private dataService: DataServiceService,
    private authService: AuthServiceService
  ) {
    this.userId = authService.getUserDetails().userId;
  }
  ngOnInit(): void {
    this.dataService.getAccunts().subscribe(
      (accounts) => {
        for (let account of accounts) {
          if (account.customerID === this.userId) {
            this.accountDetails = account;
          }
        }
      },
      (err) => {
        this.toastService.show({
          type: 'error',
          message: 'Some issue while fetching account details.',
        });
      }
    );
  }
}
