import { Injectable } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "../componentes/modal/modal/modal.component";
import { result } from "lodash";

@Injectable({
    providedIn: 'root'
  })
  export class modalService {

    public acepto:boolean = false;
    
    constructor(private modalService: NgbModal){}
    
    open(titulo: string, body: string) {

      let modal = this.modalService.open(ModalComponent, { centered: true })
      modal.componentInstance.titulo = titulo;
      modal.componentInstance.body = body;
  
    }

    async openConfirm(titulo: string, body: string): Promise<boolean> {

      let modal = this.modalService.open(ModalComponent, { centered: true })
      modal.componentInstance.titulo = titulo;
      modal.componentInstance.body = body;
      modal.componentInstance.footer = true;
      modal.componentInstance.footerSimple = false;
      await modal.result.then(
        (result)=>{
          console.log(result)
          return result;
        }
      )
      return false;
    }
    openReload(titulo: string, body: string) {

      let modal = this.modalService.open(ModalComponent, { centered: true })
      modal.componentInstance.titulo = titulo;
      modal.componentInstance.body = body;
      modal.componentInstance.reload = true;
  
    }
  }