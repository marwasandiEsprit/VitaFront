import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductsComponent } from '../products/products.component';
import { ProductType, Products } from '../models/products';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  readonly PRODUCT_API_URL = 'http://localhost:8085/vita/product/';
  constructor(private httpclient: HttpClient) {}

  addProduct(formData: FormData) {
    return this.httpclient.post(this.PRODUCT_API_URL + 'addProduct', formData);
  }

  getAllProducts() {
    return this.httpclient.get<Products[]>(
      this.PRODUCT_API_URL + 'getallprods'
    );
  }

  editProduct(id: number, product: Products) {
    const url = this.PRODUCT_API_URL + 'update/' + product.idProducts; // Assuming there's an "id" property in the Product object
    return this.httpclient.put(url, product);
  }

  getproductId(id: number): Observable<Products> {
    return this.httpclient.get<Products>(
      `${this.PRODUCT_API_URL}getproductId/${id}`
    );
  }

  deleteProduct(id: number): Observable<void> {
    const url = `${this.PRODUCT_API_URL}deleteprod/${id}`;
    return this.httpclient.delete<void>(url);
  }

  countProductsByTypeProd(): Observable<Map<ProductType, number>> {
    return this.httpclient.get<Map<ProductType, number>>(
      `${this.PRODUCT_API_URL}countByTypeProd`
    );
  }

  calculateTotalPriceByTypeProd(): Observable<Map<ProductType, number>> {
    return this.httpclient.get<Map<ProductType, number>>(
      `${this.PRODUCT_API_URL}sumPriceByTypeProd`
    );
  }

  // shouldIncreaseQuantity(idProducts: number): Observable<boolean> {
  //   return this.httpclient.get<boolean>(
  //     `${this.PRODUCT_API_URL}shouldIncrease/${idProducts}`
  //   );
  // }

//   sellProduct(idProducts: number, quantitySold: number): Observable<void> {
//     const url = `${this.PRODUCT_API_URL}sellProduct/${idProducts}?quantitySold=${quantitySold}`;
//     return this.httpclient.post<void>(url, null);
// }

sellProduct(idProducts: number, quantitySold: number, buyerId: number): Observable<void> {
  const url = `${this.PRODUCT_API_URL}sellProduct/${idProducts}?quantitySold=${quantitySold}&buyerId=${buyerId}`;
  return this.httpclient.post<void>(url, null);
}

// sellProduct(idProducts: number, quantitySold: number, buyerId: number): Observable<void> {
//   const url = `${this.PRODUCT_API_URL}sellProduct/${idProducts}?quantitySold=${quantitySold}`;
//   const body = { quantitySold, buyerId }; // Include quantitySold and buyerId in the request body
//   return this.httpclient.post<void>(url, body);
// }



}
