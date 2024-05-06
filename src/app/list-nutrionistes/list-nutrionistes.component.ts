import { Component } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../_services/user.service';
import { ERole } from '../models/ERole';

@Component({
  selector: 'app-list-nutrionistes',
  templateUrl: './list-nutrionistes.component.html',
  styleUrls: ['./list-nutrionistes.component.css']
})
export class ListNutrionistesComponent {
  nutritionistes : User[] = [] ;
  constructor(private userService: UserService) {
    this.userService.findByRolesName(ERole.ROLE_NUTRITOINISTE).subscribe(user => {

      this.nutritionistes = user  ;} );
    
  }
}
