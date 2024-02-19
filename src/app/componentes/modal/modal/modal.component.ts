import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { modalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-modal-simple',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class ModalComponent{

  @Input() titulo: string;
  @Input() body: string;
  @Input() footer: boolean = false;
  @Input() reload: boolean = false;
  @Input() footerSimple: boolean = true;

  constructor(private activeModal: NgbActiveModal,private modalService:modalService) {}


  close() {
    this.activeModal.close(false);
    if (this.reload) location.reload();
    
  }
  dismiss(arg0: string) {
    this.activeModal.dismiss(arg0);
    if (this.reload) location.reload();

  }
  aceptar(){
    this.activeModal.close(true);
  }

}
