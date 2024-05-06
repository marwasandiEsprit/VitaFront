import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service';
import { QuotesService } from 'src/app/components/quotes.service';
import { Quotes } from 'src/app/models/quotes';

@Component({
  selector: 'app-edite-quote',
  templateUrl: './edite-quote.component.html',
  styleUrls: ['./edite-quote.component.css']
})
export class EditeQuoteComponent {
  id: number=0;
  product: Quotes = new Quotes();
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
    

    this.quoteService.getproductId(this.id).subscribe(data=>{
      this.product= data;
    })

    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
    }
  }
  isUserRoleAdmin(): boolean {
    return this.roles.includes('ROLE_ADMIN');
  }
  UpdateProduct(): void {
    this.quoteService.editProduct(this.id, this.product).subscribe(() => {
  
      this.router.navigate(['/allquotes/']);
    });
  }
}

