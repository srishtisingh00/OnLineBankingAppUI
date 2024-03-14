import { Component, inject, Input, Type } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css',
})
export class ConfirmationModalComponent {
  modal = inject(NgbActiveModal);
  @Input() text: string = '';
}
