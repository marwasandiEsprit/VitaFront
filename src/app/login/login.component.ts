import {Component, OnInit} from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../components/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import {StorageService} from "../_services/storage.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  response: any = {
    mfaEnabled: false
  };
  otpCode = '';
  isVerifySuccessful = false;
  isVerifyFailed = false;

  constructor(private authService: AuthService, private storageService: StorageService,private router: Router ) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.response = data;
        if(!data.mfaEnabled)
        {this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;

          if (this.storageService.isAdminLoggedIn())
        {
          this.router.navigate(["listUser"]);
        }
        if (this.storageService.isClientLoggedIn())
        {
            this.router.navigate([""]);
        }
        if (this.storageService.isCoachLoggedIn())
        {
            this.router.navigate([""]);
        }
        if (this.storageService.isNutritionistLoggedIn())
        {
            this.router.navigate([""]);
        }
        if (this.storageService.isPsychologistLoggedIn())
        {
            this.router.navigate([""]);
        }
      }},
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  verifyTfa() {
    const verifyRequest = {
      username: this.form.username,
      code: this.otpCode
    }
    this.authService.verifyCode(verifyRequest)
      .subscribe({
        next: (data: any) => {
          this.storageService.saveUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.storageService.getUser().roles;
          this.reloadPage();
        },
        error: (err: any) => {
          this.isVerifySuccessful = false;
          this.isVerifyFailed = true; ;
        }
      });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
