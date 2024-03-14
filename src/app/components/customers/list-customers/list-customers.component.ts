import { Component, OnInit, inject } from '@angular/core';
import { DataServiceService } from '../../../services/data-service/data-service.service';
import {
  GendersMap,
  RolesTypeMap,
  StatusMap,
} from '../../../constants/AppConstant';
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterModule } from '@angular/router';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { ToastService } from '../../../services/toast-service/toast.service';

@Component({
  selector: 'app-list-customers',
  standalone: true,
  imports: [NgbTooltipModule, RouterModule],
  templateUrl: './list-customers.component.html',
  styleUrl: './list-customers.component.css',
})
export class ListCustomersComponent implements OnInit {
  customers: any[] = [];
  rolesTypeMap: any = RolesTypeMap;
  gendersMap: any = GendersMap;
  statusMap: any = StatusMap;
  isStatsUpdate: boolean = false;

  private modalService = inject(NgbModal);
  private toastService = inject(ToastService);

  constructor(private dataService: DataServiceService, private router: Router) {
    console.log('url', window.location.pathname.includes('Manager/Customers'));
    this.isStatsUpdate =
      !window.location.pathname.includes('Manager/Customers');
  }
  ngOnInit(): void {
    this.fetchCustomers();
  }

  fetchCustomers() {
    this.dataService.getCustomers().subscribe((data) => {
      console.log('data', data);
      this.customers = data;
    });
  }

  editUserDetails(customerID: any) {
    this.router.navigate([`/edit/${customerID}`]);
  }

  addAccount(customerID: any) {
    this.router.navigate([`/addAccount/${customerID}`]);
  }

  addNewCustomer() {
    this.router.navigate([`/Customers/Create`]);
  }

  deleteCustomer(customerID: any) {
    this.dataService.deleteCustomer(customerID).subscribe(
      (response) => {
        console.log(response);
        this.toastService.show({
          type: 'success',
          message: 'Customer deleted successfully.',
        });
        this.fetchCustomers();
      },
      (err) => {
        console.log(err);
        this.toastService.show({
          type: 'error',
          message: 'Failed to delete customer.',
        });
      }
    );
  }

  deleteCustomerConfirmation(customerID: any, customerName: any) {
    console.log('deleting customer', customerID);
    const modalRef = this.modalService.open(ConfirmationModalComponent, {});
    modalRef.componentInstance.text = `Are you sure you want to delete ${customerName}(${customerID}) customer?`;
    modalRef.result.then((data) => {
      if (data === 'yes') {
        this.deleteCustomer(customerID);
      }
    });
  }
}
