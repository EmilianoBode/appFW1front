import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from 'src/app/_services/login.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { modalService } from 'src/app/_services/modal.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule,SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  public User: string;
  public Pass: string;

  constructor(private log : LoginService, private router : Router, private modal : modalService){}
  login(){
    this.log.getUserLogin('login.'+this.User+'.'+this.Pass).subscribe({
      next: (user: any)=>{
        if(user != null){
          sessionStorage.setItem("UserLogueado",JSON.stringify(user));
          this.router.navigateByUrl('/')
        }
        else{
          this.modal.open('Error de autenticación','Usuario o contraseña incorrecto')
          console.log('Usuario o Contraseña incorrecto')
        }
      }
    })
  }
}
