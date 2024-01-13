import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from 'src/app/_services/util.service';
import { ModalComponent } from 'src/app/componentes/modal/modal/modal.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.scss'],
  imports: [CommonModule, SharedModule,ModalComponent],
  standalone: true
})
export default class EditMenuComponent implements OnInit{

  public data: any[];
  public titulo: string = "Nuevo Menú";

  constructor(public util: UtilService,private modalService : NgbModal){}

  ngOnInit(): void {
   this.util.getTabular('tabular.editarmenu').subscribe({
    next: (m:any[]) =>{
      this.data = m;
    }
   })
  }

  get keys(){
    return this.data && this.data.length > 0 ? Object.keys(this.data[0]) : [];
  }

  isTypeString(key){
    console.log(typeof key)
    return typeof key == 'object'
  }


  openModal(){

    let modal = this.modalService.open(ModalComponent,{centered :true})
    modal.componentInstance.titulo = 'Error';
    modal.componentInstance.body = 'No implementado aún'

  }
}
