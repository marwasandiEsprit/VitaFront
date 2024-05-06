import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsServiceService } from 'src/app/components/questions-service.service';
import { Questions } from 'src/app/models/Questions';

@Component({
  selector: 'app-add-questions-a',
  templateUrl: './add-questions-a.component.html',
  styleUrls: ['./add-questions-a.component.css']
})
export class AddQuestionsAComponent {
  newQuote: Questions = {
    question: '',
    answer: '',
  };

  constructor(private QuestionsService: QuestionsServiceService, private router: Router) {}

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
