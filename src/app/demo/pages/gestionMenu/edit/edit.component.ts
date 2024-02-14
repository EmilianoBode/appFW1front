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
 export default class EditComponent implements OnInit{
  @Input() data: any[];
  @Input() column: any[];
  @Input() ref : string;
  private dataFilter: any[];
  public userRol: any[];
  public menuList: any[];
  public valoresInput: any[]= [];
  public inputBusqueda: string;

  constructor(public utilService: UtilService, private menuService:menuService,private modalService: NgbModal){}

  ngOnInit(): void {
        this.dataFilter = this.data;
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

}
