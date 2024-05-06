import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service';
import { QuotesService } from 'src/app/components/quotes.service';
import { Quotes } from 'src/app/models/quotes';

@Component({
  selector: 'app-delete-quote',
  templateUrl: './delete-quote.component.html',
  styleUrls: ['./delete-quote.component.css']
})
export class DeleteQuoteComponent {
  id: number=0;
  quote: Quotes = new Quotes();
  status: boolean = false;
  private roles: string[] = [];
  isLoggedIn = false;
  addToggle()
  {
    this.status = !this.status;       
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quoteService: QuotesService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.quoteService.getproductId(this.id).subscribe(data => {
      this.quote = data;
    });

    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
    }
  }

  isUserRoleAdmin(): boolean {
    return this.roles.includes('ROLE_ADMIN');
  }
  confirmDelete(): void {
    if (confirm('Are you sure you want to delete this Quote?')) {
      this.deleteProduct();
    }
  }
  deleteProduct(): void {
    this.quoteService.deleteQuote(this.id).subscribe(() => {

      this.router.navigate(['/allquotes']); 
    });
  }

}
