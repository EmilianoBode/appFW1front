import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-simple',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class ModalComponent {

  @Input() titulo: string = '';
  @Input() body: string = '';
  @Input() footer: boolean = true;

  constructor(private activeModal: NgbActiveModal) { }
  close(arg0: string) {
    this.activeModal.close(arg0);
  }
  dismiss(arg0: string) {
    this.activeModal.dismiss(arg0);
  }

}
