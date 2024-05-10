import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/components/products.service';
import { Products } from 'src/app/models/products';
import Chart from 'chart.js/auto';
import { StorageService } from 'src/app/_services/storage.service';
@Component({
  selector: 'app-dash-products',
  templateUrl: './dash-products.component.html',
  styleUrls: ['./dash-products.component.css'],
})
export class DashProductsComponent implements OnInit, AfterViewInit {
  status = false;
  sortOption: string = 'name';
  addToggle() {
    this.status = !this.status;
  }

  searchTerm: string = ''; // Holds the search term entered by the user
  products: Products[] = []; // Holds the list of all products
  prods: { [key: string]: number } = {}; // Holds the count of products by type
  private roles: string[] = [];
  isLoggedIn = false;
  filteredProducts: Products[] = [];
  pageSize = 5; // Number of products per page
  currentPage = 1; // Current page
  totalPages = 0; // Total number of pages
  pages: number[] = []; // Array of page numbers
  pagedProducts: Products[] = [];

  constructor(private productService: ProductsService,private storageService: StorageService) {}
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  @ViewChild('priceChartCanvas') priceChartCanvas!: ElementRef;
  chart: Chart | undefined;
  priceChart: Chart | undefined;
  selectedChart: 'productPrice' | 'productCount' = 'productCount';
  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.getAllProducts();
    this.getprod();
    this.getprodPrice();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;
    }
  }
  isUserRoleAdmin(): boolean {
    return this.roles.includes('ROLE_ADMIN');
  }
  ngAfterViewInit() {
    if (this.chartCanvas.nativeElement) {
      if (this.selectedChart === 'productCount') {
        this.renderChart([], []);
      } else if (this.selectedChart === 'productPrice') {
        this.renderChartprice([], []);
      }
    } else {
      console.error('Canvas element not found');
    }
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
        this.filterProducts(); // Call filterProducts method after getting products
        this.updatePagination();
        // this.checkIncreaseQuantity();
      },
      (error: any) => {
        console.error('Failed to retrieve products:', error);
      }
    );
  }

  filterProducts(): void {
    if (!this.searchTerm.trim()) {
      this.filteredProducts = this.products;
      return;
    }

    this.filteredProducts = this.products.filter(
      (product) =>
        product?.prodName
          ?.toLowerCase()
          ?.includes(this.searchTerm.toLowerCase().trim()) ||
        false ||
        product?.typeProd
          ?.toLowerCase()
          ?.includes(this.searchTerm.toLowerCase().trim()) ||
        false ||
        product?.price
          ?.toString()
          ?.includes(this.searchTerm.toLowerCase().trim()) ||
        false ||
        product?.descriptionP
          ?.toLowerCase()
          ?.includes(this.searchTerm.toLowerCase().trim()) ||
        false
    );
  }
  sortProducts(): void {
    switch (this.sortOption) {
      case 'name':
        this.pagedProducts.sort((a, b) =>
          a.prodName && b.prodName ? a.prodName.localeCompare(b.prodName) : 0
        );
        break;
      case 'type':
        this.pagedProducts.sort((a, b) =>
          a.typeProd && b.typeProd ? a.typeProd.localeCompare(b.typeProd) : 0
        );
        break;
      case 'price':
        this.pagedProducts.sort((a, b) =>
          a.price && b.price ? a.price - b.price : 0
        );
        break;
      case 'highestPrice':
        this.pagedProducts.sort((a, b) =>
          a.price && b.price ? b.price - a.price : 0
        );
        break;

      default:
        this.pagedProducts.sort((a, b) =>
          a.prodName && b.prodName ? a.prodName.localeCompare(b.prodName) : 0
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

  getprod(): void {
    this.productService.countProductsByTypeProd().subscribe(
      (data) => {
        if (data && typeof data === 'object') {
          // Filter out properties with null values and convert the rest to an object
          const filteredData = Object.entries(data)
            .filter(([_, value]) => value !== null)
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

          // Extract keys and values from the filtered data
          const labels = Object.keys(filteredData);
          const values = Object.values(filteredData).map((val) => Number(val));

          // Render the chart with the extracted data
          this.renderChart(labels, values);
        } else {
          console.error('Data returned is not in the expected format:', data);
        }
      },
      (error: any) => {
        console.error('Failed to retrieve product counts by type:', error);
      }
    );
  }

  renderChart(labels: string[], values: number[]): void {
    if (!this.chartCanvas || !this.chartCanvas.nativeElement) {
      console.error('Canvas element not found');
      return;
    }

    // Check if there's an existing chart instance
    if (this.chart) {
      // Destroy the existing chart instance
      this.chart.destroy();
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not found');
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Number of Products By Categorie',
            data: values,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  getprodPrice(): void {
    this.productService.calculateTotalPriceByTypeProd().subscribe(
      (data) => {
        if (data && typeof data === 'object') {
          // Filter out properties with null values and convert the rest to an object
          const filteredData = Object.entries(data)
            .filter(([_, value]) => value !== null)
            .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

          // Extract keys and values from the filtered data
          const labels = Object.keys(filteredData);
          const values = Object.values(filteredData).map((val) => Number(val));

          // Render the chart with the extracted data
          this.renderChartprice(labels, values);
        } else {
          console.error('Data returned is not in the expected format:', data);
        }
      },
      (error: any) => {
        console.error('Failed to retrieve product counts by type:', error);
      }
    );
  }
  renderChartprice(labels: string[], values: number[]): void {
    if (!this.priceChartCanvas || !this.priceChartCanvas.nativeElement) {
      console.error('Canvas element not found');
      return;
    }

    // Check if there's an existing chart instance
    if (this.priceChart) {
      // Destroy the existing chart instance
      this.priceChart.destroy();
    }

    const ctx = this.priceChartCanvas.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not found');
      return;
    }

    this.priceChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'totale prices(tnd) for each categorie',
            data: values,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
  toggleChart(): void {
    if (this.selectedChart === 'productCount') {
      this.getprod();
    } else if (this.selectedChart === 'productPrice') {
      this.getprodPrice();
    }
  }
}
