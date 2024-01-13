import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.scss'],
  imports: [CommonModule, SharedModule],
  standalone: true
})
export default class EditMenuComponent implements OnInit{

  public data: any[];

  public titulo: string = "Nuevo Menú";

  constructor(public util: UtilService){}

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
}
