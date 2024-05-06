import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-food-data-service',
  templateUrl: './food-data-service.component.html',
  styleUrls: ['./food-data-service.component.css']
})
export class FoodDataServiceComponent {
  
  private apiUrl = 'https://api.nal.usda.gov/fdc/v1/foods/search';
  private apiKey = 'WFjML3JgUyqgWb8XXrRapPwhFMrWiPWbcxvx8Mck'; 

  constructor(private http: HttpClient) { }

  searchFood(query: string): Observable<any> {
    const params = new HttpParams().set('api_key', this.apiKey).set('query', query);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get<any>(this.apiUrl, { params, headers });
  }
}
