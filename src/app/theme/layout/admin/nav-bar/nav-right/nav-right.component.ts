// Angular import
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit{
  private user: any;
  public username: string;

  ngOnInit():void{
    this.user = JSON.parse(sessionStorage.getItem("UserLogueado"))
    console.log(this.user)
    this.username = this.user.name;
  }
}
