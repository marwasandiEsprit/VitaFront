import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from "../_services/auth.service";

@Component({
  selector: 'app-verifiaction',
  templateUrl: './verifiaction.component.html',
  styleUrls: ['./verifiaction.component.css']
})
export class VerifiactionComponent implements OnInit {
  token= '' ;
  constructor(public authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }
  verifyEmail(token: string)
  {
    this.authService.verifyEmail(token).subscribe((data: any) => {
      console.log(data);
      this.route.navigate(['/login']);
    }, (err: any) => {
      console.log(err);
    });
  }
}
