import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service';
import { User } from 'src/app/models/user';
import { PsychiatristService } from 'src/app/services/psychiatrist.service';

@Component({
  selector: 'app-listpsyadmin',
  templateUrl: './listpsyadmin.component.html',
  styleUrls: ['./listpsyadmin.component.css']
})
export class ListpsyadminComponent {
  users: User[] = [];
  status: boolean = false;
  filterTerm: string = '';
  filteredUsers: User[] = [];
  private roles: string[] = [];
  isLoggedIn = false;
  addToggle()
  {
    this.status = !this.status;       
  }
  constructor(private userServic: PsychiatristService, private router: Router,private storageService: StorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.getPsychiatristUsers();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
    }
  }

  isUserRoleAdmin(): boolean {
    return this.roles.includes('ROLE_ADMIN');
  }
  getPsychiatristUsers(): void {
    this.userServic.getPsychiatrists()
      .subscribe(users => {
        this.users = users;
        this.applyFilter(); // Apply filter initially
      });
  }

  applyFilter(): void {
    if (this.filterTerm.trim() !== '') {
      this.filteredUsers = this.users.filter(user =>
        user.username?.toLowerCase().includes(this.filterTerm.toLowerCase())
      );
    } else {
      this.filteredUsers = this.users; // If filterTerm is empty, display all users
    }
  }

  clearFilter(): void {
    this.filterTerm = '';
    this.applyFilter(); // Refresh the filtered user list
  }
  getStars(rating: number | undefined): number[] {
    const stars: number[] = [];
    // Check if rating is defined, if not, return an empty array
    if (typeof rating === 'undefined') {
      return stars;
    }
    for (let i = 0; i < Math.floor(rating); i++) {
      stars.push(i);
    }
    return stars;
  }
  
  
}
