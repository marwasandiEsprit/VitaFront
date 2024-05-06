import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DishType } from '../models/ingredients.models';

@Injectable({
  providedIn: 'root'
})
export class DishTypeService {
  private apiUrl = 'http://localhost:8085/vita/dish-types';  // Adjust with your actual API URL

  constructor(private http: HttpClient) { }

  getDishTypes(): Observable<DishType[]> {
    return this.http.get<DishType[]>(this.apiUrl);
  }
}
