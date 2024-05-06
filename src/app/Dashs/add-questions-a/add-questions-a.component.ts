import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service';
import { QuestionsServiceService } from 'src/app/components/questions-service.service';
import { Questions } from 'src/app/models/Questions';

@Component({
  selector: 'app-add-questions-a',
  templateUrl: './add-questions-a.component.html',
  styleUrls: ['./add-questions-a.component.css']
})
export class AddQuestionsAComponent implements OnInit{
  newQuote: Questions = {
    question: '',
    answer: '',
  };
  status: boolean = false;
  private roles: string[] = [];
  isLoggedIn = false;
  addToggle()
  {
    this.status = !this.status;       
  }
  constructor(private QuestionsService: QuestionsServiceService, private router: Router,private storageService: StorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
    }
  }
  isUserRoleAdmin(): boolean {
    return this.roles.includes('ROLE_ADMIN');
  }



  addQuote() {
    this.QuestionsService.addQuestion(this.newQuote).subscribe(
      (response) => {
        console.log('Question and answer added successfully:', response);

        this.newQuote = {
          question: '',
          answer: '',
         
        };
      },
      (error) => {
        console.error('Error adding Quote:', error);
      }
    );
    // this.router.navigate(['/']);
  }
}
