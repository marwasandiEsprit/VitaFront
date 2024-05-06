import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Ingredients } from '../models/ingredients.models';

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  private baseUrl = 'http://localhost:8085/vita/ingredients'; // Assurez-vous de mettre le bon port et le bon chemin d'accès

  constructor(private http: HttpClient) { }

  addIngredient(ingredient: Ingredients): Observable<Ingredients> {
    return this.http.post<Ingredients>(this.baseUrl, ingredient);
  }

  getIngredientById(id: number): Observable<Ingredients> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Ingredients>(url);
  }

  getAllIngredients(): Observable<Ingredients[]> {
    return this.http.get<Ingredients[]>(this.baseUrl);
  }

  updateIngredient(id: number, ingredient: Ingredients): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, ingredient);
  }

  deleteIngredient(id: number): Observable<any> {
    console.log(id)
    const url = `${this.baseUrl}/${id}`;
    console.log(url)

    return this.http.delete(url);
  }

  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.baseUrl}/media`, formData, {
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
