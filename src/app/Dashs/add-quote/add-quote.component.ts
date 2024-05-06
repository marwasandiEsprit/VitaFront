import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuotesService } from 'src/app/components/quotes.service';
import { Quotes } from 'src/app/models/quotes';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.css'],
})
export class AddQuoteComponent {
  newQuote: Quotes = {
    quoteTitle: '',
    descriptionQuotes: '',
    rate: 0,
  };

  constructor(private QuotesService: QuotesService, private router: Router) {}

  addQuote() {
    this.QuotesService.addQuoate(this.newQuote).subscribe(
      (response) => {
        console.log('Quote added successfully:', response);

        this.newQuote = {
          quoteTitle: '',
          descriptionQuotes: '',
          rate: 0,
        };
      },
      (error) => {
        console.error('Error adding Quote:', error);
      }
    );
    // this.router.navigate(['/']);
  }
}
