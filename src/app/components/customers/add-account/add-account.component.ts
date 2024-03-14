import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../../../services/data-service/data-service.service';
import { ToastService } from '../../../services/toast-service/toast.service';

@Component({
  selector: 'app-add-account',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.css',
})
export class AddAccountComponent implements OnInit {
  customerId: number | undefined;
  isAlreadyAccount: boolean = false;
  accountId = 0;
  accountForm: FormGroup<any>;
  customerData: any;
  private toastService = inject(ToastService);
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataServiceService,
    private route: ActivatedRoute
  ) {
    this.accountForm = this.formBuilder.group({
      customerID: [this.customerId, Validators.required],
      id: ['', Validators.required],
      balance: ['', Validators.required],
      dateOfOpening: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log('ng on init sgn up');
    this.route.params.subscribe((params) => {
      console.log('params', params);
      const customerId = params['customerId'];
      this.customerId = parseInt(customerId);
      if (!isNaN(this.customerId)) {
        this.fetchCustomer();
        this.dataService.getAccunts().subscribe((accounts) => {
          console.log('data', accounts);
          for (let act of accounts) {
            if (act.customerID === this.customerId) {
              this.isAlreadyAccount = true;
              this.accountId = act.accountId;
              break;
            }
          }
        });
      }
    });
  }

  fetchCustomer() {
    if (this.customerId) {
      this.dataService.getCustomer(this.customerId).subscribe((data) => {
        console.log('data', data);
        this.customerData = data;
      });
    }
  }

  addAccount() {
    console.log(this.accountForm.value);
    this.dataService.addAccounts(this.accountForm.value).subscribe(
      (res) => {
        this.toastService.show({
          type: 'success',
          message: 'Account created successfully.',
        });
        this.router.navigate(['/Manager/CustomerStatusUpdate']);
      },
      (err) => {
        this.toastService.show({
          type: 'error',
          message: 'Failed to create Account.',
        });
      }
    );
  }
}
