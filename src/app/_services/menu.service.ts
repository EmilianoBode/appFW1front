import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { MenuDTO } from '../_models/menuDTO';
@Injectable({
  providedIn: 'root'
})
export class menuService {

  public urlActive: string;

    constructor(private http : HttpClient){}



    getMenu(): Observable<MenuDTO[]>{

      let userLog = JSON.parse(sessionStorage.getItem("UserLogueado"));

        return this.http.post<MenuDTO[]>('api/tabular.menuget',userLog);
    }

    mergeMenu(url: string, body: any) : Observable<any> {
     return this.http.put('api/'+url,body)
      .pipe(
        map(result => result)
        )
    }
    createMenu(url: string, body: any) : Observable<any> {
      return this.http.post('api/'+url,body)
       .pipe(
         map(result => result)
         )
     }
     createRolMenu(url: string, body: any) : Observable<any> {
      return this.http.post('api/'+url,body)
       .pipe(
         map(result => result)
         )
     }
    deleteMenu(url: string): Observable<any>{
      return this.http.delete('api/'+url)
        .pipe(
          map(result => result)
        )
    }
    deleteRolMenu(url: string): Observable<any>{
      return this.http.delete('api/'+url)
        .pipe(
          map(result => result)
        )
    }

}