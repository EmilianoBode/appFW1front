import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuDTO } from '../models/menuDTO';
@Injectable({
  providedIn: 'root'
})
export class menuService {

    constructor(private http : HttpClient){}

    getMenu(): Observable<MenuDTO[]>{
        return this.http.get<MenuDTO[]>('api/tabular.menu');
    }

}