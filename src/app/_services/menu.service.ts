import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { MenuDTO } from '../_models/menuDTO';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class menuService {

  public urlActive: string;
  private urlApi: string = environment.url;

  constructor(private http: HttpClient) { }



  getMenu(): Observable<MenuDTO[]> {

    let userLog = JSON.parse(sessionStorage.getItem("UserLogueado"));

    return this.http.post<MenuDTO[]>('api/tabular.menuget', userLog);
  }

  mergeMenu(url: string, body: any): Observable<any> {
    return this.http.put(this.urlApi + url, body)
      .pipe(
        map(result => result)
      )
  }
  createMenu(url: string, body: any): Observable<any> {
    return this.http.post(this.urlApi + url, body)
      .pipe(
        map(result => result)
      )
  }
  createRolMenu(url: string, body: any): Observable<any> {
    return this.http.post(this.urlApi + url, body)
      .pipe(
        map(result => result)
      )
  }
  deleteMenu(url: string): Observable<any> {
    return this.http.delete(this.urlApi + url)
      .pipe(
        map(result => result)
      )
  }
  deleteRolMenu(url: string): Observable<any> {
    return this.http.delete(this.urlApi + url)
      .pipe(
        map(result => result)
      )
  }

}