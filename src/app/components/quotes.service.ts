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
  deleteQuoteCart(id: number): Observable<void> {
    const url = `${this.PRODUCT_API_URL}deletequote/${id}`;
    return this.httpclient.delete<void>(url);
  }
}
