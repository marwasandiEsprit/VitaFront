import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Quotes } from '../models/quotes';
@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  readonly PRODUCT_API_URL = 'http://localhost:8085/vita/quoates/';
  constructor(private httpclient: HttpClient) {}
  addQuoate(quote: Quotes) {
    return this.httpclient.post(this.PRODUCT_API_URL + 'addquote', quote);
  }

  getAllQuotes() {
    return this.httpclient.get<Quotes[]>(this.PRODUCT_API_URL + 'getallquotes');
  }
  deleteQuote(id: number): Observable<void> {
    const url = `${this.PRODUCT_API_URL}deletequote/${id}`;
    return this.httpclient.delete<void>(url);
  }
  editProduct(id: number, quote: Quotes) {
    const url = this.PRODUCT_API_URL + 'updatequote/' +quote.idQuotes; // Assuming there's an "id" property in the Product object
    return this.httpclient.put(url, quote);
  }
  getproductId(idQuotes: number): Observable<Quotes> {
    return this.httpclient.get<Quotes>(
      `${this.PRODUCT_API_URL}getquotebyid/${idQuotes}`
    );
  }
}
