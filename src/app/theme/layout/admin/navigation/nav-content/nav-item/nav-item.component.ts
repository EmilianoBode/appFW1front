// Angular import
import { Component, Input } from '@angular/core';

// Project import
import { NavigationItem } from '../../navigation';
import { MenuDTO } from 'src/app/_models/menuDTO';
import { UtilService } from 'src/app/_services/util.service';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent {
  // public props
  @Input() item!: MenuDTO;

  constructor(private serv : UtilService){}

  // public method
  closeOtherMenu(event: any) {
    const ele = event.target;
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent.parentElement.parentElement;
      const last_parent = up_parent.parentElement;
      const sections = document.querySelectorAll('.coded-hasmenu');
      for (let i = 0; i < sections.length; i++) {
        sections[i].classList.remove('active');
        sections[i].classList.remove('coded-trigger');
      }

      if (parent.classList.contains('coded-hasmenu')) {
        parent.classList.add('coded-trigger');
        parent.classList.add('active');
      } else if (up_parent.classList.contains('coded-hasmenu')) {
        up_parent.classList.add('coded-trigger');
        up_parent.classList.add('active');
      } else if (last_parent.classList.contains('coded-hasmenu')) {
        last_parent.classList.add('coded-trigger');
        last_parent.classList.add('active');
      }
    }
    if ((document.querySelector('app-navigation.coded-navbar') as HTMLDivElement).classList.contains('mob-open')) {
      (document.querySelector('app-navigation.coded-navbar') as HTMLDivElement).classList.remove('mob-open');
    }
  }

  ejecutarMetodo(metodo:string,itemName:string): void{
    if (!metodo) return
    
    this.serv.menuTitulo = itemName;
    this.serv.getTabular(metodo).subscribe({
      next: (m :any[]) =>{
        this.serv.tabular = m;
      }
    })

  }
}
