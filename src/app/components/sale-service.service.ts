import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sale } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class SaleServiceService {
  readonly SALE_API_URL = 'http://localhost:8085/vita/sale/';
  constructor(private httpclient: HttpClient) {}

  getAllProducts() {
    return this.httpclient.get<Sale[]>(
      this.SALE_API_URL + 'getsales'
    );
  }

}
