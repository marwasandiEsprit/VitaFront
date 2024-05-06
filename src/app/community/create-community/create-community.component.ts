import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CommunityService} from "../community.service";
import {Community} from "../../models/community";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.css']
})
export class CreateCommunityComponent implements OnInit {
  communityForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private communityService: CommunityService
  ) {
  }

  ngOnInit(): void {
    this.communityForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }


  onSubmit(): void {
    this.submitted = true;
    if (this.communityForm.valid) {
      this.communityService.addCommunity(this.communityForm.value as Community)
        .subscribe(createdCommunity => {
          console.log('Community created successfully:', createdCommunity);
          this.router.navigate(['community'])
        });
    } else {
      console.debug("invalid form")
    }
  }
}
