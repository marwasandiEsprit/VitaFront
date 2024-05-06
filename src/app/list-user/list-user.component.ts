import { Component } from '@angular/core';
import { User } from '../models/user';
import {RoleService} from "../_services/role.service";
import {Router} from "@angular/router";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent {
  status = false;
  sortOption: string = 'name';
  addToggle()
  {
    this.status = !this.status;
  }

  pageSize = 4; // Number of products per page
  currentPage = 1; // Current page
  totalPages = 0; // Total number of pages
  pages: number[] = []; // Array of page numbers
  pagedProducts: User[] = [];
  users: any[] = [];
  searchTerm: string = '';
  roles: any[] = [];
  roleFilter: string = '';

  chart1!:any;

  constructor(private userService: UserService,private roleService: RoleService, private router : Router) { }

  ngOnInit(): void {
    this.getAllUsers()
    this.getRoles()
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
      next: (users: any[]) => {
        this.users = users;
      },
      error: err => {
        console.error('Error fetching users:', err);
      }
    });
  }

  editUser(id: any) {
    this.router.navigate(['/edituser/'+ id]);
  }

  filterUsers(): any[] {
    return this.users.filter(user => {
      const usernameMatches = !this.searchTerm || user.username.toLowerCase().includes(this.searchTerm.toLowerCase());
      const roleMatches = !this.roleFilter || user.roles.some((role: { name: string; }) => role.name === this.roleFilter);
      return usernameMatches && roleMatches;
    });
  }

  getRoles() {
    this.roleService.getRoles().subscribe(res => {
      this.roles = res;
    })
  }

  confirmDelete(id: any): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this User?');

    if (confirmDelete) {
      this.deleteUser(id);
    }
  }

  deleteUser(id: any): void {
    this.userService.deleteUser(id).subscribe(
      () => {
        console.log(`User with ID ${id} deleted successfully.`);
        this.getAllUsers();
      },
      (error) => {
        console.error(`Error deleting user with ID ${id}:`, error);
        this.getAllUsers();
      }
    );
  }

  calculateScores(): void {
    this.userService.calculateScores()
      .subscribe(() => {
        console.log('Scores calculated successfully');
        this.getAllUsers();
      });
  }

  affectClusters() {
    this.userService.affectClustersClients().subscribe({
      next: () => {
        console.log('Clusters affected successfully.');
        this.getAllUsers();
      },
      error: (err) => {
        console.error('Error affecting clusters:', err);
      }
    });
  }

}
