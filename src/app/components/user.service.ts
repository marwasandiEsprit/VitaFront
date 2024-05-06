import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly USER_API_URL='http://localhost:8085/vita/user/'
  constructor(private httpclient: HttpClient) { }
  loginUser(user:User){
    return this.httpclient.post(this.USER_API_URL+'login',user);
  }
  saveuser(user:User){
    return this.httpclient.post(this.USER_API_URL+'save',user);
  }

  getAllUsers(){
    return this.httpclient.get<User[]>(this.USER_API_URL+'getallusers')

  }

  getuserId(id: number): Observable<User> {
    return this.httpclient.get<User>(`${this.USER_API_URL}getuserid/${id}`);
  }

updateUser(id: number , user : User){
  const url = this.USER_API_URL +'update/'+ user.id;
  return this.httpclient.put(url,user)


}
}
