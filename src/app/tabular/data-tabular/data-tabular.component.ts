import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UtilService } from 'src/app/_services/util.service';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

@Component({
  selector: 'app-data-tabular',
  templateUrl: './data-tabular.component.html',
  styleUrls: ['./data-tabular.component.scss'],
  imports: [CommonModule],
  standalone: true
})
export class DataTabularComponent{

  @Input() data?: any[];
  @Input() column?: any[]
  constructor(public UtilService : UtilService){}

  get items(){
    return this.data && this.data.length > 0 ? Object.keys(this.data[0]) : [];
  }
  
  get keys(){
    return this.column && this.column.length > 0 ? Object.values(this.column[0]) : [];
  }
}
