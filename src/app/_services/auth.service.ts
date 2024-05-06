import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8085/vita/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string, mfaEnabled: any): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
        mfaEnabled
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }

  verifyCode(verifyRequest: { username: string; code: string }) {
    return this.http.post(AUTH_API + 'verify', verifyRequest)
  }

  forgetpassword(email: string): Observable<any> {
    const body = { email: email };
    return this.http.post(AUTH_API +'forgetpassword', body);
  }

  resetpassword(token: any, password: any): Observable<any>
  { return this.http.put(AUTH_API +'resetpassword', {token, password});}

  verifyEmail(token: string): Observable<any>{
  return this.http.post(AUTH_API + 'activate', token); }
}
