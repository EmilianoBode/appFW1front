import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { menuNuevo } from 'src/app/_models/menuNuevo';
import { menuService } from 'src/app/_services/menu.service';
import { UtilService } from 'src/app/_services/util.service';
import { ModalComponent } from 'src/app/componentes/modal/modal/modal.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import * as _ from 'lodash';
import { menuEditar } from 'src/app/_models/menuEditar';
import { modalService } from 'src/app/_services/modal.service';
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

  constructor(public utilService: UtilService, private modal: modalService, private menuService: menuService) { }

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
      return this.modal.open('Aviso!', 'Completá los campos obligatorios!')
    }
    else if (typeof menuNuevo.padre != 'number' && menuNuevo.padre != null) {
      return this.modal.open('Aviso!', 'El campo "padre" debe contener numeros')
    }
    else if (typeof menuNuevo.orden != 'number' || menuNuevo.orden == null || menuNuevo.orden == 0) {
      return this.modal.open('Aviso!', 'El campo "orden" debe contener números y no puede ser 0')
    }

    this.menuService.createMenu('tabular.menu', menuNuevo).subscribe(
      () => {
        this.valoresInput = [];
        location.reload();
        this.utilService.tabular.push(menuNuevo)
      }, (err: HttpErrorResponse) => {
        this.modal.open('Error', err.statusText);
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

    if (_.isEqual(this.dataOrigin, dataChangue)) return this.modal.open('Aviso', 'No hay nada que actualizar!')

    let diffData = dataChangue.filter((changue) => {
      const correspondingOrigin = this.dataOrigin.find(origin => origin.id === changue.id);
      return !_.isEqual(changue, correspondingOrigin)
    })

    this.menuService.mergeMenu('tabular.menu', diffData).subscribe(
      () => {
        location.reload();
      },
      (err: HttpErrorResponse) => {
        this.modal.open('Error', 'Ups, algo salio mal: ' + err.statusText)
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

    // this.modal.open('Warning!','Estás seguro de borrar el menú "'+ menuDe[0].name + '"?');
    this.menuService.deleteMenu('tabular.menu.' + menuDe[0].id).subscribe(
      () => {
        location.reload();
      },
      (err: HttpErrorResponse) => {
        this.modal.open('Error', 'Error al intentar borrar ' + menuDe[0].name + ' (' + err.statusText + ')');

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
