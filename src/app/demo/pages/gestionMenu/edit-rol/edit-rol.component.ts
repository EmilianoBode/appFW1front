import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilService } from 'src/app/_services/util.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ModalComponent } from 'src/app/componentes/modal/modal/modal.component';
import { RolMenu } from 'src/app/_models/rolMenu';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { menuService } from 'src/app/_services/menu.service';
import { HttpErrorResponse } from '@angular/common/http';
import { result } from 'lodash';
import { ToastService } from 'src/app/_services/Toast/toast-service';

@Component({
  selector: 'app-edit-rol',
  standalone: true,
  imports: [CommonModule,SharedModule,ModalComponent],
  templateUrl: './edit-rol.component.html',
  styleUrls: ['./edit-rol.component.scss']
})
export default class EditRolComponent implements OnInit {
  private data: any[];
  private column: any[];
  public userRol: any[];
  public menuList: any[];
  public valoresInput: any[]= [];
  public inputBusqueda: string;
  public inputBusqueda2: any;

  constructor(private utilService: UtilService, private menuService:menuService,private modalService: NgbModal, private toastService:ToastService) { }

  ngOnInit(): void {
    this.utilService.getTabular('tabular.rolmenu').subscribe({
      next: (m: any[]) => {
        this.data = m[0].data;
        this.column = m[0].column;
      }
    })
    this.utilService.getTabular('tabular.rol_usuarios').subscribe({
      next: (r: any[])=>{
        this.userRol = r;
      }
    })
    this.utilService.getTabular('tabular.editarmenu').subscribe({
      next: (mm: any[])=>{
        this.menuList = mm;
      }
    })
  }


  get items() {
    return this.data && this.data.length > 0 ? Object.values(this.data) : [];
  }

  get keys() {
    return this.column && this.column.length > 0 ? Object.values(this.column[0]) : [];
  }

  get keysData(){
    return this.data && this.data.length > 0 ? Object.keys(this.data[0]) : [];
  }

  openModal(titulo: string, body: string, reload: boolean) {

    let modal = this.modalService.open(ModalComponent, { centered: true })
    modal.componentInstance.titulo = titulo;
    modal.componentInstance.body = body;
    modal.componentInstance.footer = true;
    modal.componentInstance.reload = reload;

  }

  setMenuRol():void{
    let inputData = document.querySelectorAll('.Selected');
    let idMenu = parseInt((inputData[0] as HTMLSelectElement).value);
    let idRolUsuario = parseInt((inputData[1] as HTMLSelectElement).value);

    let rolMenuNuevo : RolMenu = {
      id:null,
      idMenu:idMenu,
      idRolUsuario: idRolUsuario
    }

    if(isNaN(rolMenuNuevo.idMenu) || isNaN(rolMenuNuevo.idRolUsuario)){
      return this.openModal('Aviso!', 'Completá todos los campos!', false)
    }

    this.menuService.createRolMenu('tabular.rolmenu',rolMenuNuevo).subscribe(
      (resp) => {
        if(resp.estado){
          location.reload();
        }
        else{
           return this.openModal('Aviso!', resp.respuesta, false)
        }
      }
    );
  }

  deleteMenuRol(id: number):void {
    this.menuService.deleteRolMenu(`tabular.rolmenu.${id}`).subscribe(
      () => {
        location.reload();
      },
      (err: HttpErrorResponse) => {
        this.openModal('Error', 'Error al intentar borrar el rol (' + err.statusText + ')', false);

      }
    );
  }
}