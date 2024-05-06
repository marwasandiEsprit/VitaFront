import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Questions } from '../models/Questions';
import { QuestionsServiceService } from '../components/questions-service.service';

@Component({
  selector: 'app-chatbot-qa',
  templateUrl: './chatbot-qa.component.html',
  styleUrls: ['./chatbot-qa.component.css'],
})
export class ChatbotQAComponent implements OnInit {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  questionAnswers: Questions[] = [];
  selectedQuestion: Questions | null = null;
  currentPage = 1;
  pageSize = 4; 
  isThinking: boolean = false;

  constructor(private qaService: QuestionsServiceService) {}

  ngOnInit(): void {
    this.loadQuestionAnswers();
  }

  loadQuestionAnswers() {
    this.qaService.getAllQuestions().subscribe(
      (data) => {
        this.questionAnswers = data;
      },
      (error) => {
        console.error('Error loading question answers:', error);
      }
    );
  }
  selectQuestion(question: Questions) {
    this.selectedQuestion = question;
    this.isThinking = true; // Set isThinking to true when a question is selected
  
    // Simulate thinking time (you can replace this with actual processing time)
    setTimeout(() => {
      this.isThinking = false; // Set isThinking to false when thinking is done
    }, 2000); // Adjust the timeout duration as needed
  }
  
  getPaginatedQuestionAnswers(): Questions[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.questionAnswers.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    const maxPage = Math.ceil(this.questionAnswers.length / this.pageSize);
    if (this.currentPage < maxPage) {
      this.currentPage++;
    }
  }
  
}
