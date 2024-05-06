import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/_services/storage.service';
import { QuotesService } from 'src/app/components/quotes.service';
import { Quotes } from 'src/app/models/quotes';

@Component({
  selector: 'app-all-quotes',
  templateUrl: './all-quotes.component.html',
  styleUrls: ['./all-quotes.component.css']
})
export class AllQuotesComponent implements OnInit{
  sortOption: string = 'name';
  quotes: Quotes[] = [];
  searchTerm: string = ''; 
  filteredProducts: Quotes[] = [];
  pageSize = 8; // Number of products per page
  currentPage = 1; // Current page
  totalPages = 0; // Total number of pages
  pages: number[] = []; // Array of page numbers
  pagedProducts: Quotes[] = [];
  status: boolean = false;
  private roles: string[] = [];
  isLoggedIn = false;
  addToggle()
  {
    this.status = !this.status;       
  }
  constructor(private quoteService: QuotesService,private storageService: StorageService) {}


  ngOnInit(): void {
    this.loadQuestionAnswers();
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
    }
  }
  isUserRoleAdmin(): boolean {
    return this.roles.includes('ROLE_ADMIN');
  }
  loadQuestionAnswers() {
    this.quoteService.getAllQuotes().subscribe(
      (data) => {
        this.quotes = data;
        this.filterProducts(); // Call filter function after receiving data
        this.updatePagination(); // Call pagination update function
      },
      (error) => {
        console.error('Error loading Quotes:', error);
      }
    );
  }

  filterProducts(): void {
    if (!this.searchTerm.trim()) {
      this.filteredProducts = this.quotes;
    } else {
      this.filteredProducts = this.quotes.filter(
        (quotes) =>
          quotes?.quoteTitle
            ?.toLowerCase()
            ?.includes(this.searchTerm.toLowerCase().trim()) ||
          quotes?.descriptionQuotes
            ?.toLowerCase()
            ?.includes(this.searchTerm.toLowerCase().trim())
      );
    }
    this.sortProducts(); // Call sort function after filtering
    this.updatePagination(); // Call pagination update function
  }

  sortProducts(): void {
    switch (this.sortOption) {
      case 'name':
        this.filteredProducts.sort((a, b) =>
          a.quoteTitle && b.quoteTitle ? a.quoteTitle.localeCompare(b.quoteTitle) : 0
        );
        break;
      case 'type':
        this.filteredProducts.sort((a, b) =>
          a.descriptionQuotes && b.descriptionQuotes ? a.descriptionQuotes.localeCompare(b.descriptionQuotes) : 0
        );
        break;
      default:
        this.filteredProducts.sort((a, b) =>
          a.quoteTitle && b.quoteTitle ? a.quoteTitle.localeCompare(b.quoteTitle) : 0
        );
        break;
    }
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.pageSize);

    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }

    this.goToPage(1);
  }

  goToPage(page: number): void {
    this.currentPage = page;

    const startIndex = (page - 1) * this.pageSize;

    this.pagedProducts = this.filteredProducts.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }
}
