import { Component, inject } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../../services/toast-service/toast.service';

@Component({
  selector: 'app-global-toast',
  standalone: true,
  imports: [NgbToastModule],
  templateUrl: './global-toast.component.html',
  styleUrl: './global-toast.component.css',
  host: {
    class: 'toast-container position-fixed top-0 end-0 p-3',
    style: 'z-index: 1200',
  },
})
export class GlobalToastComponent {
  toastService = inject(ToastService);
  toastClassMap: any = {
    error: 'bg-danger text-light',
    success: 'bg-success text-light',
  };

  getClassName(toast: any) {
    return this.toastClassMap[toast.type];
  }
}
