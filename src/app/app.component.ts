import { Component, OnInit } from '@angular/core';
import { LoginService } from './_services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'AppFW1';
  constructor(private Log : LoginService, private router: Router){}
  
  ngOnInit(): void {
    this.login();
    console.log(sessionStorage.getItem("UserLogueado"))

    if(sessionStorage.getItem("UserLogueado") == 'null'){
      this.router.navigateByUrl('guest/login')
    }
  }


  login(){
    this.Log.getUserLogin('login.administ.administ').subscribe({
      next: (user: any)=>{
        sessionStorage.setItem("UserLogueado",JSON.stringify(user));
      }
    })
  }
}
