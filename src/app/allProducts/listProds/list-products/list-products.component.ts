import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/components/products.service';
import { FoodDataServiceComponent } from 'src/app/food-data-service/food-data-service.component';
import { Products } from 'src/app/models/products';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit{
  products: Products[] = [];
  currentPage = 1;
  itemsPerPage = 12;
  searchQuery: string = ''; 
  searchResults: any[] = [];
 


  selectedFood: any; 
  constructor(private productService: ProductsService,private router: Router, private foodDataService:FoodDataServiceComponent ) { }

  ngOnInit(): void {
    
    console.log('ListPsychologueComponent initialized');

    this.getAllProducts();
    // this.renderBarChart('count'); 
  }

  
  
 

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      
      (data) => {
        this.products = data;
       
      },
      (error: any) => {
        console.error('Failed to retrieve products:', error);
      }
      
    );
    console.log('listProdsComponent initialized');
  }
  get totalPages(): number {
    return Math.ceil(this.products.length / this.itemsPerPage);
  }

  get paginatedProducts(): Products[][] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.chunkArray(this.products.slice(startIndex, startIndex + this.itemsPerPage), 4);
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
