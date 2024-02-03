// Angular import
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/_services/util.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit{
  private user: any;
  public username: string;

  constructor(private router: Router,private utilService: UtilService){}

  ngOnInit():void{
    this.user = JSON.parse(sessionStorage.getItem("UserLogueado"))
    this.username = this.user.name;
  }

  logOut(){
    sessionStorage.setItem("UserLogueado",null)
    this.utilService.data=null;
    this.utilService.column=null;
    this.utilService.menuTitulo ='';
    this.router.navigateByUrl('guest/login')
  }
}
