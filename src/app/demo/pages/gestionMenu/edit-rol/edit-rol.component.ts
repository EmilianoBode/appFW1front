import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilService } from 'src/app/_services/util.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ModalComponent } from 'src/app/componentes/modal/modal/modal.component';

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
  constructor(private utilService: UtilService) { }

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
        console.log(this.userRol)
        console.log(this.data)
      }
    })
    this.utilService.getTabular('tabular.editarmenu').subscribe({
      next: (mm: any[])=>{
        this.menuList = mm;
        console.log(this.menuList)
        console.log(this.data)
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

}