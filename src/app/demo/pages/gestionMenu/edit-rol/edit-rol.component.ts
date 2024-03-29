import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilService } from 'src/app/_services/util.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ModalComponent } from 'src/app/componentes/modal/modal/modal.component';
import { RolMenu } from 'src/app/_models/rolMenu';
import { menuService } from 'src/app/_services/menu.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from 'src/app/_services/Toast/toast-service';
import { modalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-edit-rol',
  standalone: true,
  imports: [CommonModule,SharedModule,ModalComponent],
  templateUrl: './edit-rol.component.html',
  styleUrls: ['./edit-rol.component.scss']
})
export default class EditRolComponent implements OnInit {
  private data: any[];
  private dataFilter: any[];
  private column: any[];
  public userRol: any[];
  public menuList: any[];
  public valoresInput: any[]= [];
  public inputBusqueda: string;
  public inputBusqueda2: string;

  constructor(private utilService: UtilService, private menuService:menuService,private modal: modalService) { }

  ngOnInit(): void {
    this.utilService.getTabular('tabular.rolmenu').subscribe({
      next: (m: any[]) => {
        this.data = m[0].data;
        this.column = m[0].column;
        this.dataFilter = this.data;
      }
    })
    this.utilService.getTabular('tabular.rol_usuarios').subscribe({
      next: (r: any[])=>{
        this.userRol = r[0].data;
      }
    })
    this.utilService.getTabular('tabular.editarmenu').subscribe({
      next: (mm: any[])=>{
        this.menuList = mm;
      }
    })
  }


  get items() {
    return this.dataFilter && this.data.length > 0 ? Object.values(this.dataFilter) : [];
  }

  get keys() {
    return this.column && this.column.length > 0 ? Object.values(this.column[0]) : [];
  }

  get keysData(){
    return this.dataFilter && this.data.length > 0 ? Object.keys(this.dataFilter[0]) : [];
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
      return this.modal.open('Aviso!', 'Completá todos los campos!')
    }

    this.menuService.createRolMenu('tabular.rolmenu',rolMenuNuevo).subscribe(
      (resp) => {
        if(resp.estado){
          location.reload();
        }
        else{
           return this.modal.open('Aviso!', resp.respuesta)
        }
      }
    );
  }

  deleteMenuRol(id: number):void {
   
    this.menuService.deleteRolMenu(`tabular.rolmenu.${id}`).subscribe(
      () => {
        this.dataFilter = this.dataFilter.filter((d)=>d.id != id)
      },
      (err: HttpErrorResponse) => {
        this.modal.open('Error', 'Error al intentar borrar el rol (' + err.statusText + ')');

      }
    );
  }

  buscarByMenuName(intput:string):void {

    this.dataFilter = [];
    let busqueda = intput.toUpperCase();

    for (const item of this.data) {
        let name = item.idMenu.name.toUpperCase();
        if (name.includes(busqueda)) {
          this.dataFilter.push(item)
        }
    };
  }

  buscarByRolName(intput:string):void {

    this.dataFilter = [];
    let busqueda = intput.toUpperCase();

    for (const item of this.data) {
        let name = item.idRolUsuario.name.toUpperCase();
        if (name.includes(busqueda)) {
          this.dataFilter.push(item)
        }
    };
  }

  busquedaReset():void{
    this.inputBusqueda = '';
    this.inputBusqueda2 = '';
    this.dataFilter = this.data;
  }
}