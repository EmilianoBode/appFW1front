import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UtilService } from 'src/app/_services/util.service';
import { DataTabularComponent } from 'src/app/tabular/data-tabular/data-tabular.component';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
  standalone: true,
  imports: [CommonModule,DataTabularComponent,HomeComponent]
})
export class GeneralComponent {

  constructor(public utilService : UtilService){}

}
