// Angular Import
import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTabularComponent } from 'src/app/tabular/data-tabular/data-tabular.component';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'app-default',
  standalone: true,
  imports: [CommonModule, DataTabularComponent],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export default class DefaultComponent implements OnInit, OnChanges{
  // public props
  public data: any[] = [];
  // Constructor
  constructor(public utilService: UtilService) {}



  // Life cycle events
  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {

  }


}
