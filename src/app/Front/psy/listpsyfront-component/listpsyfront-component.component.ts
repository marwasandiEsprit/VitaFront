import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { PsychiatristService } from 'src/app/services/psychiatrist.service';

@Component({
  selector: 'app-listpsyfront-component',
  templateUrl: './listpsyfront-component.component.html',
  styleUrls: ['./listpsyfront-component.component.css']
})
export class ListpsyfrontComponentComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';

  constructor(private userService: PsychiatristService, private router: Router) { }

  ngOnInit(): void {
    this.getPsychiatristUsers();
  }

  getPsychiatristUsers(): void {
    this.userService.getPsychiatrists()
      .subscribe(users => {
        this.users = users;
        this.applyFilters();
      });
  }

  reserveConsultation(psychiatristId: number): void {
    this.router.navigate(['/addconsultation', psychiatristId]);
  }

  getStars(rating: number | undefined): any[] {
    const stars = Math.round(rating || 0);
    return Array(stars).fill(0);
  }

  applyFilters(): void {
    console.log("Applying filters...");
    console.log("Search term:", this.searchTerm);
  
    if (!this.searchTerm.trim()) {
      this.filteredUsers = this.users;
    } else {
      console.log(this.searchTerm);
      this.filteredUsers = this.users.filter(user =>
        user?.username?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user?.email?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      
    }
  
    console.log("Filtered users:", this.filteredUsers);
  }
  
}