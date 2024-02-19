import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public Data : any[];
  private urlApi:string = environment.url
  constructor(private http : HttpClient) { }

  getUserLogin(url:string): Observable<any[]> {
    return this.http.get<any[]>(this.urlApi + url);
  }
}
