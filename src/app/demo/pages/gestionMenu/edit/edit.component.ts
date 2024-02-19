import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ModalComponent } from 'src/app/componentes/modal/modal/modal.component';
import { UtilService } from 'src/app/_services/util.service';
import { menuService } from 'src/app/_services/menu.service';
import { HttpErrorResponse } from '@angular/common/http';
import { modalService } from 'src/app/_services/modal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import _ from 'lodash';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, SharedModule, ModalComponent],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export default class EditComponent implements OnInit, OnChanges {
  @Input() data: any[];
  @Input() column: any[];
  @Input() ref: string;
  @Input() desp: string[];
  private dataFilter: any[] = [];
  private dataCopy: any;
  public desplegableData: any;
  public menuList: any[];
  public valoresInput: any = {};
  public inputBusqueda: string;

  constructor(public utilService: UtilService, private modal:modalService, private modalService: NgbModal) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataFilter = structuredClone(this.data);
      this.dataCopy = structuredClone(this.column[0]);
      this.setDataType();
    }
    if (changes['desp']) {
      this.getDesplegablesMapping();
      this.valoresInput = [];
    }
  }

  ngOnInit(): void {
    this.dataFilter = structuredClone(this.data);

  }


  async getDesplegablesMapping() {

    this.desplegableData = {};

    let despData: any[] = [];
    let keyData: any[] = this.getKeyWithObj();

    if (this.desp != null) {
      for (let i = 0; i < this.desp.length; i++) {
        const desplegable = Object.values(this.desp[i])[0];
        try {
          const d: any[] = await this.utilService.getTabular('tabular.' + desplegable).toPromise();
          despData.push(d[0].data);
        } catch (error) {
          console.error('Error al obtener datos para ' + desplegable, error);
        }
      }
      for (let i = 0; i < keyData.length; i++) {
        const key = keyData[i];
        this.desplegableData[key] = despData[i]
      }
    }
  }

  get items() {
    return this.dataFilter && this.data.length > 0 ? Object.values(this.dataFilter) : [];
  }

  get keysValues() {
    return this.column && this.column.length > 0 ? Object.values(this.column[0]) : [];
  }
get keys(){
  return this.column && this.column.length > 0 ? Object.keys(this.column[0]) : [];
}


  get keysData() {
    return this.dataFilter && this.data.length > 0 ? Object.keys(this.dataFilter[0]) : [];
  }

  isObject(item: any): boolean {
    if (item == null) return false
    return typeof item === "object";
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
  resetBusqueda(): void {
    this.dataFilter = structuredClone(this.data);
    this.inputBusqueda = '';
  }

  getKeyWithObj() {
    let keyList: any[] = [];
    let item = structuredClone(this.desp)
    for (const it of item) {
      keyList.push(Object.keys(it)[0])
    }

    return keyList;
  }

  isKeyWObjct(keyCompare: any, obj: any[]): boolean {
    for (const key in obj) {
      if (key === keyCompare) {
        return true
      }
    }
    return false;
  }

  setDataType():void {

    for (const key in this.column[0]) {
      this.dataCopy[key] = null;
    }
  }


  setData() {

    let objSet = this.dataCopy;

    for (const key in objSet) {
      if (this.valoresInput[key] != undefined) {
        objSet[key] = this.valoresInput[key].trim();
      }
    }
    

    console.log(objSet)
    this.utilService.setTabular(this.utilService.ejecutar,objSet).subscribe(
      (res)=>{
        if(res.estado){

        this.utilService.reloadData(this.utilService.ejecutar).then(data => this.dataFilter = data)
        this.valoresInput = [];
        this.setDataType();

        }
        else{
          this.modal.open('Error',res.respuesta);
        }
      },
      (err:HttpErrorResponse)=>{
        this.modal.open('Error '+err.status.toString(),err.statusText);
      }
    )
  }

  async deleteData(id:number){

    if (confirm('Seguro que desea eliminar este registro?')) {
      this.utilService.deleteTabular(this.utilService.ejecutar+'.'+id).subscribe(
        (res)=>{
          if (res.estado) {
            this.modal.open('Eliminado',res.respuesta);
            this.dataFilter = this.dataFilter.filter((f)=> f.id != id);
          } else {
            this.modal.open('Aviso!',res.respuesta);
          }
        },
        (err:HttpErrorResponse)=>{
          this.modal.open(err.status.toString(),err.statusText);
        }
      )
    }
  }

  updateData(){
    let dataOrigin = structuredClone(this.dataFilter)
    let dataChangue = this.extractValues();

    if (_.isEqual(dataOrigin,dataChangue)) {
      return this.modal.open('Atención!','No hay datos que actualizar!')
    }

    let dataDiff = dataChangue.filter(
      (changue) =>{
        const dataFind = dataOrigin.find(origin => origin.id == changue.id)
        return !_.isEqual(changue, dataFind)
      }
    )

    this.utilService.updateData(this.utilService.ejecutar,dataDiff).subscribe(
      (resp)=>{
        if(resp.estado){
          this.modal.open('Éxito!',resp.respuesta)
          this.utilService.reloadData(this.utilService.ejecutar).then(data => this.dataFilter = data)
        }
        else{
          this.modal.open('Atención!',resp.respuesta)
        }
      },
      (err:HttpErrorResponse)=>{
        this.modal.open('Error '+err.status.toString(),err.statusText);
      }
    )
  }

  extractValues():any[]{
    let newArray: any[] = [];

    const objRow = document.querySelectorAll('.tbodyData tr');

    objRow.forEach(row => {
      let newItem :any  = {};
      let input = row.querySelectorAll('.inputItem1, .Selected1');

      input.forEach((input, i) => {
        const key = this.keysData[i];
        const inputValue = (input as HTMLInputElement).value.trim();

        if (!isNaN(parseInt(inputValue)) && inputValue.length < 3) {
          
          if (this.desplegableData[key]) {
            let objArray= this.desplegableData[key].filter(d=>d.id == parseInt(inputValue));
            newItem[key] = objArray[0];
          }
          else{
            newItem[key] = parseInt(inputValue);
          }
        }else if(inputValue.trim() == '') {
          newItem[key] = null;
        } else{
          newItem[key] = inputValue;
        }
        
      });
      newArray.push(newItem)
    });

    return newArray;

  }

}

