import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service';
import { QuotesService } from 'src/app/components/quotes.service';
import { Quotes } from 'src/app/models/quotes';

@Component({
  selector: 'app-add-quote',
  templateUrl: './add-quote.component.html',
  styleUrls: ['./add-quote.component.css'],
})
export class AddQuoteComponent implements OnInit{
  newQuote: Quotes = {
    quoteTitle: '',
    descriptionQuotes: '',
    rate: 0,
  };
  status: boolean = false;
  private roles: string[] = [];
  isLoggedIn = false;
  addToggle()
  {
    this.status = !this.status;       
  }
  constructor(private QuotesService: QuotesService, private router: Router,private storageService: StorageService) {}
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
