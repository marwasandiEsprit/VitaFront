import { Component, OnInit } from '@angular/core';
import { QuotesService } from 'src/app/components/quotes.service';
import { Quotes } from 'src/app/models/quotes';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit{
  quotes: Quotes[] = [];
  constructor(private quoteService: QuotesService) {}

  ngOnInit(): void {
    this.loadQuestionAnswers();
  }

  loadQuestionAnswers() {
    this.quoteService.getAllQuotes().subscribe(
      (data) => {
        this.quotes = data;
     
      },
      (error) => {
        console.error('Error loading Quotes:', error);
      }
    );
  }
}
