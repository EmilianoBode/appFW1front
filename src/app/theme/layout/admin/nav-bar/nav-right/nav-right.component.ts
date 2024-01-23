// Angular import
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit{
  private user: any;
  public username: string;

  constructor(private router: Router){}

  ngOnInit():void{
    this.user = JSON.parse(sessionStorage.getItem("UserLogueado"))
    console.log(this.user)
    this.username = this.user.name;
  }

  logOut(){
    sessionStorage.setItem("UserLogueado",null)
    this.router.navigateByUrl('guest/login')
  }
}
