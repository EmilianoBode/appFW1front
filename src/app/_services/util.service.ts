import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { MenuDTO } from '../_models/menuDTO';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private urlApi:string = environment.url;
  
  public menuTitulo: string;
  public Menu: MenuDTO;
  public tabular: any[];
  public data:any[];
  public column:any[];
  public ref: string;
  public desp: any[];
  public ejecutar:string;
  public isBoolean: string[];
  public isDate: string[];
  public paramsObligatorios: string[];


  constructor(private http: HttpClient) {}

  getTabular(url: string): Observable<any[]> {
    return this.http.get<any[]>(this.urlApi + url);
  }

  setTabular(url:string,body:any):Observable<any>{
    return this.http.post(this.urlApi + url,body).pipe(map(result => result));
  }
  
  deleteTabular(url:string):Observable<any>{
    return this.http.delete(this.urlApi + url).pipe(map(result => result));
  }

  updateData(url:string,body:any[]): Observable<any>{
    return this.http.put(this.urlApi + url,body).pipe(map(result => result))
  }

  async reloadData(url:string) {
    try {
      const d: any[] = await this.getTabular(url).toPromise();
      return d[0].data;
    } catch (error) {
      console.log(error);
    }
  }
}
