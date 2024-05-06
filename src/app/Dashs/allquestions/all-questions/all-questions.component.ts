import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/_services/storage.service';
import { QuestionsServiceService } from 'src/app/components/questions-service.service';
import { Questions } from 'src/app/models/Questions';

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.css']
})
export class AllQuestionsComponent implements OnInit{
  sortOption: string = 'name';
  quotes: Questions[] = [];
  searchTerm: string = ''; 
  filteredProducts: Questions[] = [];
  pageSize = 8; // Number of products per page
  currentPage = 1; // Current page
  totalPages = 0; // Total number of pages
  pages: number[] = []; // Array of page numbers
  pagedProducts: Questions[] = [];
  status: boolean = false;
  private roles: string[] = [];
  isLoggedIn = false;
  addToggle()
  {
    this.status = !this.status;       
  }
  constructor(private quoteService: QuestionsServiceService,private storageService: StorageService) {}


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
    this.quoteService.getAllQuestions().subscribe(
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
          quotes?.question
            ?.toLowerCase()
            ?.includes(this.searchTerm.toLowerCase().trim()) ||
          quotes?.answer
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
          a.answer && b.answer ? a.answer.localeCompare(b.answer) : 0
        );
        break;
      case 'type':
        this.filteredProducts.sort((a, b) =>
          a.question && b.question ? a.question.localeCompare(b.question) : 0
        );
        break;
      default:
        this.filteredProducts.sort((a, b) =>
          a.question && b.question ? a.question.localeCompare(b.question) : 0
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


