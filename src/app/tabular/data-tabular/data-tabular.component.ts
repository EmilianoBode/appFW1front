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
  constructor(public titulo : UtilService){}

  get keys(){
    return this.data && this.data.length > 0 ? Object.keys(this.data[0]) : [];
  }
}
