import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/_services/storage.service';
import { CartService } from 'src/app/components/cart.service';
import { ProductsService } from 'src/app/components/products.service';
import { Cart, Products } from 'src/app/models/products';

@Component({
  selector: 'app-details-products',
  templateUrl: './details-products.component.html',
  styleUrls: ['./details-products.component.css'],
})
export class DetailsProductsComponent {
  cartItems: Cart[] = [];
  products: Products[] = [];
  id: number = 0;
  product: Products = new Products();
  quantity: number = 1; // Default quantity is 1
  ownerId: number = 0;
  idProducts:number=0;
  isLoggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();

      this.ownerId = user.id;
    }
    this.productService.getproductId(this.id).subscribe(
      (data) => {
        console.log('Received product data:', data); // Log the received data
        this.product = data;
      },
      (error) => {
        console.error('Error fetching product data:', error); // Log any errors
      }
    );
    this.getAllProducts();
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


  addToCart() {
    if (!isNaN(this.ownerId) && this.ownerId !== 0 && this.product) {
      if (this.product.quantityP !== undefined && this.product !== null) {
        this.cartService
          .getCartByOwnerId(this.ownerId)
          .subscribe((existingCartItems) => {
            const existingCartItem = existingCartItems.find(
              (item) => item.products === this.product.prodName
            );
            const currentQuantityInCart = existingCartItem?.quantity ?? 0;

            const totalQuantity = currentQuantityInCart + this.quantity;

            if (
              this.product.quantityP &&
              totalQuantity > this.product.quantityP
            ) {
              alert('Cannot add more than available stock.');
              return;
            }

            const cartItem: Cart = {
              ownerId: this.ownerId,
              products: this.product.prodName,
              quantity: this.quantity,
              idProducts:this.product.idProducts,
              total: (this.product.price ?? 0) * this.quantity,
            };

            this.cartService.addToCart(this.ownerId, cartItem).subscribe(
              () => {
                console.log('Product added to cart successfully.');

                const navigate = confirm(
                  'Product added to cart successfully. Do you want to view your cart?'
                );
                if (navigate) {
                  window.location.href = '/cart';
                } else {
                }
              },
              (error) => {
                console.error('Error adding product to cart:', error);
              }
            );
          });
      } else {
        console.error('QuantityP is undefined or product is null.');
      }
    } else {
      console.log('Product addition to cart cancelled by the user.');
    }
  }

  @ViewChild('imageContainer') imageContainer!: ElementRef;
  @ViewChild('productImage') productImage!: ElementRef;

  onMouseEnter(event: MouseEvent): void {
    const containerRect =
      this.imageContainer.nativeElement.getBoundingClientRect();
    const mouseX = event.clientX - containerRect.left;
    const mouseY = event.clientY - containerRect.top;
    const originX = (mouseX / containerRect.width) * 100;
    const originY = (mouseY / containerRect.height) * 100;
    this.productImage.nativeElement.style.transformOrigin = `${originX}% ${originY}%`;
  }

  onMouseLeave(): void {
    this.productImage.nativeElement.style.transformOrigin = 'center';
  }
  reloadAndNavigate(productId: number | undefined): void {
    if (productId !== undefined) {
      this.router
        .navigate(['./detailProds', productId])
        .then(() => (window.location.href = window.location.href)); // Reload the page after navigation
    } else {
      console.error('Product ID is undefined.');
    }
  }
}
