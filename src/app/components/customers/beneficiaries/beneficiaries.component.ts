import { Component, OnInit, inject } from '@angular/core';
import { DataServiceService } from '../../../services/data-service/data-service.service';
import { ToastService } from '../../../services/toast-service/toast.service';
import { AuthServiceService } from '../../../services/auth-service/auth-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../list-customers/confirmation-modal/confirmation-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beneficiaries',
  standalone: true,
  imports: [],
  templateUrl: './beneficiaries.component.html',
  styleUrl: './beneficiaries.component.css',
})
export class BeneficiariesComponent implements OnInit {
  beneficiaries: Array<any> = [];
  toastService = inject(ToastService);
  private modalService = inject(NgbModal);
  userId: any;
  constructor(
    private dataService: DataServiceService,
    private authservice: AuthServiceService,
    private router: Router
  ) {
    this.userId = this.authservice.getUserDetails().userId;
    console.log(typeof this.userId);
  }

  ngOnInit(): void {
    this.fetchBeneficiaries();
  }

  fetchBeneficiaries() {
    this.dataService.getBeneficiaries().subscribe(
      (bnfcs) => {
        this.beneficiaries = bnfcs.filter(
          (b: any) => b.customerID === this.userId
        );
      },
      (err) => {
        this.toastService.show({
          type: 'error',
          message: 'Failed to fetch beneficiaries.',
        });
      }
    );
  }

  addNewBeneficiary() {
    this.router.navigate(['/AddBeneficiaries']);
  }

  deleteBeneficiary(beneficiaryID: number) {
    console.log('this.deleteBeneficiary', beneficiaryID);
    this.dataService.deleteBeneficiaries(beneficiaryID).subscribe(
      (response) => {
        console.log(response);
        this.toastService.show({
          type: 'success',
          message: 'Beneficiary deleted successfully.',
        });
        this.fetchBeneficiaries();
      },
      (err) => {
        console.log(err);
        this.toastService.show({
          type: 'error',
          message: 'Failed to delete Beneficiary.',
        });
      }
    );
  }

  deleteBeneficiaryConfirmation(beneficiaryID: any, beneficiaryName: any) {
    console.log('deleting customer', beneficiaryID, beneficiaryName);
    const modalRef = this.modalService.open(ConfirmationModalComponent, {});
    modalRef.componentInstance.text = `Are you sure you want to delete ${beneficiaryName}(${beneficiaryID}) beneficiary?`;
    modalRef.result.then((data) => {
      if (data === 'yes') {
        this.deleteBeneficiary(beneficiaryID);
      }
    });
  }
}
