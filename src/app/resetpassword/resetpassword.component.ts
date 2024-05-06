import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router'
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  token: any;
  password: any;
  constructor(public authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }
  resetpassword(token: any, password: any)
  {
    this.authService.resetpassword(token, password).subscribe(data => {
      console.log(data);
      this.route.navigate(['/login']);
    }, err => {
      console.log(err);
    });
  }
}
