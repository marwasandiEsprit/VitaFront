import {Component, OnInit} from '@angular/core';
import {UserService} from "../_services/user.service";
import {StorageService} from "../_services/storage.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private userService: UserService, private storageService:StorageService) { }

  ngOnInit(): void {
    const userId = this.storageService.getUser().id;
    this.getUser(userId);
  }

  getUser(id: number): void {
    this.userService.getUser(id).subscribe(user => {
      this.user = user;
    });
  }


}
