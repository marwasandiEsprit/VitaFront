import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.productService.getproductId(this.id).subscribe(data => {
      this.product = data;
    });
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
