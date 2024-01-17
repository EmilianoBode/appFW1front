import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuDTO } from '../_models/menuDTO';
@Injectable({
  providedIn: 'root'
})
export class UtilService {

  menuTitulo: string;
  Menu: MenuDTO;
  tabular: any[];
  data:any[];
  column:any[];

  constructor(private http: HttpClient) {}

  getTabular(url: string): Observable<any[]> {
    return this.http.get<any[]>('api/' + url);
  }
}
