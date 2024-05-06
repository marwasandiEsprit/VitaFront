import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/components/products.service';
import { FoodDataServiceComponent } from 'src/app/food-data-service/food-data-service.component';
import { Products } from 'src/app/models/products';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  products: Products[] = [];
  currentPage = 1;
  itemsPerPage = 12;
  searchQuery: string = '';
  searchResults: any[] = [];
  filteredProducts: Products[] = [];
  selectedFood: any;
  showChatbot: boolean = false;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private foodDataService: FoodDataServiceComponent
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  toggleChatbot(): void {
    this.showChatbot = !this.showChatbot;
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = [...this.products];
        this.filterProducts(); // Call filterProducts after retrieving products
      },
      (error: any) => {
        console.error('Failed to retrieve products:', error);
      }
    );
  }

  filterProducts(): void {
    if (this.searchQuery.trim() === '') {
      // If search query is empty, display all products
      this.filteredProducts = [...this.products];
    } else {
      // Filter products based on search query
      this.filteredProducts = this.products.filter((product) => {
        return (
          product?.prodName?.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          product?.typeProd?.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    }
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  get paginatedProducts(): Products[][] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.chunkArray(
      this.filteredProducts.slice(startIndex, startIndex + this.itemsPerPage),
      4
    );
  }

  chunkArray(array: any[], size: number): any[][] {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  onSearchChange(): void {
    this.filterProducts(); // Call filterProducts whenever search query changes
    this.currentPage = 1; // Reset current page when search query changes
  }

  searchFood(query: string): void {
    this.foodDataService.searchFood(query).subscribe(
      (response) => {
        console.log('Search results:', response);
        this.searchResults = response.foods;
      },
      (error) => {
        console.error('Error searching food items:', error);
      }
    );
  }

  showFoodNutrients(food: any): void {
    this.selectedFood = food; // Set the selected food item
  }
}
