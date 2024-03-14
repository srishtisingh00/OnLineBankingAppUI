import { Component, inject } from '@angular/core';
import { ToastService } from '../../../services/toast-service/toast.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataServiceService } from '../../../services/data-service/data-service.service';

@Component({
  selector: 'app-add-beneficiary',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-beneficiary.component.html',
  styleUrl: './add-beneficiary.component.css',
})
export class AddBeneficiaryComponent {
  beneForm: FormGroup<any>;
  private toastService = inject(ToastService);
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataServiceService
  ) {
    this.beneForm = this.formBuilder.group({
      beneficiaryName: ['', Validators.required],
      beneficiaryAccountNumber: ['', Validators.required],
      customerID: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      bankName: ['', Validators.required],
      ifsc: ['', Validators.required],
      branch: ['', Validators.required],
    });
  }

  addNewBeneficiary() {
    console.log('value form', this.beneForm.value);
    this.dataService.addNewBeneficiary(this.beneForm.value).subscribe(res => {
      if(res) {
        this.toastService.show({type: "success",message: "Successfully added beneficiary."});
        this.router.navigate(["/BeneficiariesDetails"])
      }
    }, err => {
      this.toastService.show({type: "error", message: "Failed to add beneficiary."})
    })
  }
}
