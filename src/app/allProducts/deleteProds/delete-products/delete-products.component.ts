import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service';
import { ProductsService } from 'src/app/components/products.service';
import { Products } from 'src/app/models/products';

@Component({
  selector: 'app-delete-products',
  templateUrl: './delete-products.component.html',
  styleUrls: ['./delete-products.component.css']
})
export class DeleteProductsComponent {
  id: number=0;
  product: Products = new Products();
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
    private productService: ProductsService,
    private storageService: StorageService

  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.productService.getproductId(this.id).subscribe(data => {
      this.product = data;
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
    if (confirm('Are you sure you want to delete this product?')) {
      this.deleteProduct();
    }
  }
  deleteProduct(): void {
    this.productService.deleteProduct(this.id).subscribe(() => {

      this.router.navigate(['/dashProds']); 
    });
  }
}
