import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public Data : any[];
  constructor(private http : HttpClient) { }

  getUserLogin(url:string): Observable<any[]> {
    return this.http.get<any[]>('api/'+url);
  }
}
