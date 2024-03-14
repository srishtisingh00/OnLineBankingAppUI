import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SignUpRequest } from '../../../interfaces/SignUpRequest';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../../../services/data-service/data-service.service';
import { ToastService } from '../../../services/toast-service/toast.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup<any>;
  isCustomerForm: boolean = false;
  customerId: number | undefined;
  formTitle: string = 'Customer SignUp';
  toastService = inject(ToastService);
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataServiceService,
    private route: ActivatedRoute
  ) {
    this.signUpForm = this.formBuilder.group({
      customerName: ['', Validators.required],
      genderId: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      pan: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pinCode: ['', Validators.required],
      phone: ['', Validators.required],
      roleTypeId: ['2', Validators.required],
      statusID: ['1', Validators.required],
    });
  }

  mapFormFields(formData: any) {
    this.signUpForm.setValue({
      customerName: formData.customerName,
      genderId: formData.genderId,
      dateOfBirth: formData.dateOfBirth,
      pan: formData.pan,
      email: formData.email,
      password: formData.password,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pinCode: formData.pinCode,
      phone: formData.phone,
      roleTypeId: formData.roleTypeId,
      statusID: formData.statusID,
    });
  }

  ngOnInit(): void {
    console.log('ng on init sgn up');
    this.route.params.subscribe((params) => {
      console.log('params', params);
      const customerId = params['customerId'];
      this.customerId = parseInt(customerId);
      this.isCustomerForm =
        customerId.toLowerCase() === 'create' || !isNaN(this.customerId);
      this.formTitle = 'Create Customer';
      console.log('Class parameter:', this.customerId);
      if (!isNaN(this.customerId)) {
        this.formTitle = 'Edit Customer';
        this.dataService.getCustomer(this.customerId).subscribe((data) => {
          console.log('data', data);
          this.mapFormFields(data);
        });
      } else {
        this.isCustomerForm = false;
        this.signUpForm.patchValue({
          roleTypeId: '2',
          statusID: '1',
        });
      }
    });
  }

  backToHome() {
    this.router.navigate(['/home']);
  }

  submitForm() {
    console.log({ ...this.signUpForm.value });
    if (this.customerId) {
      this.dataService
        .editCustomer(
          {
            ...this.signUpForm.value,
            statusID: parseInt(this.signUpForm.value.statusID),
          },
          this.customerId
        )
        .subscribe(
          (response) => {
            console.log(response);
            this.toastService.show({
              type: 'success',
              message: 'Data saved successfully.',
            });
          },
          (err) => {
            console.log(err);
            this.toastService.show({
              type: 'error',
              message: 'Failed to sign up',
            });
          }
        );
    } else {
      this.dataService.signUp({ ...this.signUpForm.value }).subscribe(
        (response) => {
          console.log(response);
          this.toastService.show({
            type: 'success',
            message: 'Signed up successfully.',
          });
        },
        (err) => {
          console.log(err);
          this.toastService.show({
            type: 'error',
            message: 'Failed to sign up',
          });
        }
      );
    }
  }
}
