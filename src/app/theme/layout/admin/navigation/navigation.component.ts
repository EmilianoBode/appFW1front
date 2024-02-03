// Angular import
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UtilService } from 'src/app/_services/util.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  // public props
  @Output() NavCollapsedMob = new EventEmitter();
  navCollapsedMob = window.innerWidth;
  windowWidth: number;

  constructor(private utilService : UtilService){}
  setHome():void{
    this.utilService.data=null;
    this.utilService.column=null;
    this.utilService.menuTitulo ='';
  }
  // public method
  navCollapseMob() {
    if (this.windowWidth < 1025) {
      this.NavCollapsedMob.emit();
    }
  }
}
