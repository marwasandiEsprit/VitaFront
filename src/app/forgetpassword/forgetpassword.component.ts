import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router'
import {UserService} from "../_services/user.service";
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  email= '' ;
  constructor(public authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }
  forgetpassword(email: string)
  {
    this.authService.forgetpassword(email).subscribe((data: any) => {
      console.log(data);
      this.route.navigate(['/resetpassword']);
    }, (err: any) => {
      console.log(err);
    });
  }
}
