import { Component } from '@angular/core';
import {UserService} from "../_services/user.service";
import {Router} from "@angular/router";
import {StorageService} from "../_services/storage.service";

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent {
  user!: any;
  userId!: number;

  constructor(
    private userService: UserService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.userId = this.storageService.getUser().id;
    this.getUser();
  }

  getUser(): void {
    this.userService.getUser(this.userId).subscribe(user => {
      this.user = user;
      console.log("Profile fetched successfully!")
    });
  }

  updateUser(): void {
    this.userService.updateUser(this.userId, this.user).subscribe(
      response => {
        console.log("Profile updated successfully!",response);
        this.router.navigate(['profile']);
      },
      error => {
        console.log("Error in updating profile!",error)
        this.router.navigate(['profile']);
      }
    );
  }

}
