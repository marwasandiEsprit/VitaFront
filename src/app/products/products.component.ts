import { Component } from '@angular/core';
import { Products,ProductType  } from '../models/products';
import { ProductsService } from '../components/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  newProduct: Products = {
    prodName: '',
    typeProd: ProductType.PROTEIN,
    price: 0,
    quantityP: 0,
    descriptionP: '',
    imageUrl: '' ,
    expiration:''
  };
  productTypes: string[] = Object.values(ProductType);
  constructor(private productsService: ProductsService, private router: Router) {}
  addProduct() {
    const formData = new FormData();
    formData.append('prodName', this.newProduct.prodName ?? '');
    formData.append('typeProd', this.newProduct.typeProd ?? '');
    formData.append('price', (this.newProduct.price ?? 0).toString());
    formData.append('quantityP', (this.newProduct.quantityP ?? 0).toString());
    formData.append('descriptionP', this.newProduct.descriptionP ?? '');
    formData.append('expiration', this.newProduct.expiration ?? '');
    if (typeof this.newProduct.imageUrl === 'object' && (this.newProduct.imageUrl as any) instanceof File) {
      formData.append('file', this.newProduct.imageUrl);
    }
   
    this.productsService.addProduct(formData).subscribe(
      (response) => {
        console.log('Product added successfully:', response);
        
        this.newProduct = {
          prodName: '',
          typeProd: ProductType.PROTEIN,
          price: 0,
          quantityP: 0,
          descriptionP: '',
          imageUrl: '' ,
          expiration:''
        };
   
        this.router.navigate(['/dashProds']);
      },
      (error) => {
        console.error('Error adding Product:', error);
       
      }
    );
  }
  
  onFileSelected(event: any) {
 
    this.newProduct.imageUrl = event.target.files[0];
  }

  logImageUrl() {
    console.log('Image URL:', this.newProduct.imageUrl);
  }
}
