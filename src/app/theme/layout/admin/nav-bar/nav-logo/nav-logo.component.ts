// Angular import
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from 'src/app/_services/util.service';

@Component({
  selector: 'app-nav-logo',
  templateUrl: './nav-logo.component.html',
  styleUrls: ['./nav-logo.component.scss']
})
export class NavLogoComponent {
  // public props
  @Input() navCollapsed: boolean;
  @Output() NavCollapse = new EventEmitter();
  windowWidth: number;

  // Constructor
  constructor(private utilService : UtilService) {
    this.windowWidth = window.innerWidth;
  }

  setHome():void{
    this.utilService.data=null;
    this.utilService.column=null;
    this.utilService.menuTitulo ='';
  }
  // public import
  navCollapse() {
    if (this.windowWidth >= 1025) {
      this.navCollapsed = !this.navCollapsed;
      this.NavCollapse.emit();
    }
  }
}
