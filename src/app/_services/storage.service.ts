import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { ERole } from '../models/ERole';


const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }
  public isClient(): boolean {
    let user = new User() ;
    user = this.getUser();
    if (user?.roles?.includes(ERole.ROLE_CLIENT)) {
      return true;
    }
    return false}

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    return !!user;
  }

  isClientLoggedIn(): boolean {
    const user = this.getUser();
    return user && user.roles.includes('ROLE_CLIENT');
  }

  isNutritionistLoggedIn(): boolean {
    const user = this.getUser();
    return user && user.roles.includes('ROLE_NUTRITIONIST');
  }

  isPsychologistLoggedIn(): boolean {
    const user = this.getUser();
    return user && user.roles.includes('ROLE_PSYCHOLOGIST');
  }

  isCoachLoggedIn(): boolean {
    const user = this.getUser();
    return user && user.roles.includes('ROLE_COACH');
  }

  isAdminLoggedIn(): boolean {
    const user = this.getUser();
    return user && user.roles.includes('ROLE_ADMIN');
  }

}
