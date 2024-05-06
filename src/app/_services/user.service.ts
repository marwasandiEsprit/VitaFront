import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { ERole } from '../models/ERole';

const API_URL = 'http://localhost:8085/vita/api/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(API_URL + 'user/getAll');
  }

  getUser(id: any): Observable<any> {
    return this.http.get<any>(API_URL + 'user/getUser/'+ id);
  }

  updateUser(id: any, user: any): Observable<string> {
    return this.http.put<string>(API_URL + 'user/updateUser/'+ id, user);
  }

  deleteUser(id: any): Observable<string> {
    return this.http.delete<string>(API_URL + 'user/deleteUser/'+ id);
  }

  findByRolesName(role : ERole): Observable<User[]> {
    return this.http.get<User[]>(API_URL + 'user/findByRolesName/' + role);
  }

  calculateScores(): Observable<void> {
    return this.http.put<void>(API_URL + 'user/calculate-scores', null);
  }

  findUserWithMostPurchasedProducts(): Observable<any> {
    return this.http.get<any>(API_URL + 'user/most-purchased-products');
  }

  findUserWithLongestPremiumPeriod(): Observable<any> {
    return this.http.get<any>(API_URL + 'user/longest-premium-period');
  }

  findUserWithMostPaidPremuimAmount(): Observable<any> {
    return this.http.get<any>(API_URL + 'user/most-paid-premium-amount');
  }

  findUserWithMostPaidProductsAmount(): Observable<any> {
    return this.http.get<any>(API_URL + 'user/most-paid-products-amount');
  }

  findUsersWithPurchasedProducts(): Observable<Array<{userId: number, count: number}>> {
    return this.http.get<Array<{userId: number, count: number}>>(API_URL + 'user/users-with-purchased-products');
  }

  findUsersWithPaidProductsAmount(): Observable<Array<{userId: number, amount: number}>> {
    return this.http.get<Array<{userId: number, amount: number}>>(API_URL + 'user/users-with-paid-products');
  }

  findUsersWithPremiumPeriod(): Observable<Array<{userId: number, period: number}>> {
    return this.http.get<Array<{userId: number, period: number}>>(API_URL + 'user/users-with-premium-period');
  }

  findUsersWithPaidPremiumAmount(): Observable<Array<{userId: number, amount: number}>> {
    return this.http.get<Array<{userId: number, amount: number}>>(API_URL + 'user/users-with-paid-premium-amount');
  }

  affectClustersClients(): Observable<void> {
    return this.http.post<void>(API_URL + 'user/affectclustersclients', null);
  }
}
