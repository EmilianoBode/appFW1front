// Angular Import
import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTabularComponent } from 'src/app/tabular/data-tabular/data-tabular.component';
import { UtilService } from 'src/app/_services/util.service';
import { GeneralComponent } from './general/general/general.component';
import { HomeComponent } from './general/home/home.component';


@Component({
  selector: 'app-default',
  standalone: true,
  imports: [CommonModule,GeneralComponent,HomeComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export default class DefaultComponent implements OnInit, OnChanges{
  // public props
  // Constructor
  constructor() {}



  // Life cycle events
  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {

  }


}
