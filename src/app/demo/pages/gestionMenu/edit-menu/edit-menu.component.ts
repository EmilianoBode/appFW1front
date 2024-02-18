import { CommonModule } from '@angular/common';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { menuNuevo } from 'src/app/_models/menuNuevo';
import { menuService } from 'src/app/_services/menu.service';
import { UtilService } from 'src/app/_services/util.service';
import { ModalComponent } from 'src/app/componentes/modal/modal/modal.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import * as _ from 'lodash';
import { menuEditar } from 'src/app/_models/menuEditar';
@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.scss'],
  imports: [CommonModule, SharedModule, ModalComponent],
  standalone: true
})
export default class EditMenuComponent implements OnInit {

  public data: menuEditar[];
  public dataFilter: menuEditar[];
  public findPadre: menuEditar[]=[];
  public titulo: string = "Nuevo Menú";
  public valoresInput: any[] = [];
  private dataOrigin: menuNuevo[];
  public ultimoMenu: menuEditar[];
  public inputBusqueda: string;
  public inputBusqueda2: any;

  constructor(public utilService: UtilService, private modalService: NgbModal, private menuService: menuService) { }

  ngOnInit(): void {
    this.utilService.getTabular('tabular.editarmenu').subscribe({
      next: (m: any[]) => {
        this.data = m;
        this.ultimoMenu = this.data.slice(-1)
        this.dataFilter = this.data;
        this.getFinderPadre();
      }
    })
  }

  get keys() {
    return this.data && this.data.length > 0 ? Object.keys(this.data[0]) : [];
  }

  isTypeString(key) {
    return typeof key == 'object'
  }


  openModal(titulo: string, body: string, reload: boolean) {

    let modal = this.modalService.open(ModalComponent, { centered: true })
    modal.componentInstance.titulo = titulo;
    modal.componentInstance.body = body;
    modal.componentInstance.footer = true;
    modal.componentInstance.reload = reload;

  }

  SetData(): void {
    let input = this.valoresInput;

    for (let i = 0; i < this.valoresInput.length; i++) {

      if (input[i] && typeof input[i] == 'string') {

        input[i] = input[i].trim();
        if (!isNaN(parseInt(input[i]))) input[i] = parseInt(input[i]);
        if (!input[i]) input[i] = null;

      }
      else if (!input[i] || isNaN(input[i])) {
        input[i] = null;
      }
    }

    let menuNuevo: menuNuevo = {
      id: null,
      name: input[1],
      idTipo: input[2],
      icono: input[3],
      ejecuta: input[4],
      padre: input[5],
      orden: input[6]
    };

    if (menuNuevo.name == null || menuNuevo.idTipo == null) {
      return this.openModal('Aviso!', 'Completá los campos obligatorios!', false)
    }
    else if (typeof menuNuevo.padre != 'number' && menuNuevo.padre != null) {
      return this.openModal('Aviso!', 'El campo "padre" debe contener numeros', false)
    }
    else if (typeof menuNuevo.orden != 'number' || menuNuevo.orden == null || menuNuevo.orden == 0) {
      return this.openModal('Aviso!', 'El campo "orden" debe contener números y no puede ser 0', false)
    }

    this.menuService.createMenu('tabular.menu', menuNuevo).subscribe(
      () => {
        this.valoresInput = [];
        location.reload();
        this.utilService.tabular.push(menuNuevo)
      }, (err: HttpErrorResponse) => {
        this.openModal('Error', err.statusText, false);
      }
    );
  }
  updateButton() {
    this.dataOrigin = [];
    this.data.forEach(data => {
      let datos: menuNuevo = {
        id: data.id,
        name: data.name,
        idTipo: data.tipo.id,
        icono: data.icono,
        ejecuta: data.ejecuta,
        padre: data.padre,
        orden: data.orden
      };

      this.dataOrigin.push(datos);
    });

    let dataChangue = this.extractValues()

    if (_.isEqual(this.dataOrigin, dataChangue)) return this.openModal('Aviso', 'No hay nada que actualizar!', false)

    let diffData = dataChangue.filter((changue) => {
      const correspondingOrigin = this.dataOrigin.find(origin => origin.id === changue.id);
      return !_.isEqual(changue, correspondingOrigin)
    })

    this.menuService.mergeMenu('tabular.menu', diffData).subscribe(
      () => {
        location.reload();
      },
      (err: HttpErrorResponse) => {
        this.openModal('Error', 'Ups, algo salio mal: ' + err.statusText, false)
      }
    );
  }


  extractValues(): any[] {
    let newArray = [];

    const rows = document.querySelectorAll('.tbodyData tr');
    rows.forEach((row) => {
      let newItem: any = {};

      const inputs = row.querySelectorAll('.inputItem1, .Selected1');
      inputs.forEach((input, index) => {
        const key = this.keys[index];

        if (key === 'id' || key === 'orden' || key === 'padre') {
          // Manejar inputs numéricos que pueden estar vacíos
          const inputValue = (input as HTMLInputElement).value.trim();
          newItem[key] = inputValue === '' ? null : parseInt(inputValue, 10);
        } else if (key === 'tipo') {
          newItem['idTipo'] = parseInt((input as HTMLSelectElement).value.split(' ')[0], 10);
        } else {
          // Manejar otros tipos de inputs
          newItem[key] = (input as HTMLInputElement).value.trim();
          if (newItem[key] === '') newItem[key] = null;
        }
      });

      newArray.push(newItem);
    });
    return newArray;
  }

  deleteMenu(id: number) {

    let menuDe = this.data.filter((e) => e.id == id);

    // this.openModal('Warning!','Estás seguro de borrar el menú "'+ menuDe[0].name + '"?',false);
    this.menuService.deleteMenu('tabular.menu.' + menuDe[0].id).subscribe(
      () => {
        location.reload();
      },
      (err: HttpErrorResponse) => {
        this.openModal('Error', 'Error al intentar borrar ' + menuDe[0].name + ' (' + err.statusText + ')', false);

      }
    );

  }

  buscarByName(input: string): void {

    this.dataFilter = [];
    let busqueda = input.toUpperCase();

    for (const item of this.data) {
      if (item.name.toUpperCase().includes(busqueda)) {
        this.dataFilter.push(item)
      }
    }
  }
  
  buscarById(id: number): void {

    this.dataFilter = [];
    for (const item of this.data) {
      if (item.id == id) {
        this.dataFilter.push(item)
        return
      }
    }
    this.dataFilter = this.data;
  }
  resetBusqueda():void{
    this.dataFilter = this.data;
    this.inputBusqueda = '';
    this.inputBusqueda2 = '';
  }

  getFinderPadre():void{
    for (const menu of this.data) {
      if(menu.tipo.id != 3){
        this.findPadre.push(menu);
      }
    }
  }
  getNamePadre(padreId:number):string{
    for (const menu of this.findPadre) {
      if(menu.id == padreId){
        return menu.name;
      }
    }
    return null;
  }

}
