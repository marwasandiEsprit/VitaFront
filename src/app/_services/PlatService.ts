import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plat } from '../models/Plat';
import { PlatsQauntites } from '../models/PlatsQauntites';
import { AddedPlat } from '../models/AddedPlat';

@Injectable({
  providedIn: 'root'
})
export class PlatService {
  private apiUrl = 'http://localhost:8085/vita/plat'; // Replace 'your-api-url' with your actual API URL

  constructor(private http: HttpClient) { }

  getPlats(): Observable<Plat[]> {
    return this.http.get<Plat[]>(`${this.apiUrl}/getAll`);
  }
  CalculCalories(platsQuantity : PlatsQauntites) : Observable<number> {
    return this.http.post<number>(`${this.apiUrl}/CalCalories`,platsQuantity)
  }
  getPlatById(id : number): Observable<Plat> {
    return this.http.get<Plat>(`${this.apiUrl}/getPlatById/${id}`);
  }
  addPlat(plat : AddedPlat) : Observable<Plat> {
    return this.http.post<Plat>(`${this.apiUrl}/add`,plat) ;
  }
  deletePlat(id : number) :Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  getPlatesPerUser(): Observable<{ [key: number]: number }> {
    return this.http.get<{ [key: number]: number }>(`${this.apiUrl}/platesbyusers`);
  }
}