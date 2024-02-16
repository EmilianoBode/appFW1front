import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ModalComponent } from 'src/app/componentes/modal/modal/modal.component';
import { UtilService } from 'src/app/_services/util.service';
import { menuService } from 'src/app/_services/menu.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, SharedModule, ModalComponent],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
 export default class EditComponent implements OnInit, OnChanges{
  @Input() data: any[];
  @Input() column: any[];
  @Input() ref : string;
  @Input() desp: string[];
  private dataFilter: any[]=[];
  public desplegableData: any[];
  public menuList: any[];
  public valoresInput: any[]= [];
  public inputBusqueda: string;

  constructor(public utilService: UtilService, private menuService:menuService,private modalService: NgbModal){}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data']){
      this.dataFilter = this.data;
    }
    if(changes['desp']){
      this.getDesplegables();
      console.log(this.desplegableData)
    }
  }

  ngOnInit(): void {
        this.dataFilter = this.data;
        // this.getDesplegables();

  }


  getDesplegables(){
    this.desplegableData = [];
    this.desp.forEach((desplegable,i) => {
      this.utilService.getTabular('tabular.' + desplegable).subscribe({
        next: (d: any[])=>{
          this.desplegableData.push(d[0].data);
        }
      })
    });
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

  isObject(item : any): boolean{
    if(item == null) return false
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
  resetBusqueda():void{
    this.dataFilter = this.data;
    this.inputBusqueda = '';
  }
  // getObject(item: any): string{
  //   console.log(item)
  //   if (item != null){
  //     return item.name;
  //   }
  //   return null;
  // }

}
