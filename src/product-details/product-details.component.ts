import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from "../elements/header/header.component";
import { FooterComponent } from "../elements/footer/footer.component";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../app/service/cart.service';
import { AuthService } from '../app/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// ✅ ADD THIS IMPORT
import { SeoService } from '../app/seo.service';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    MatSnackBarModule
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

  @Input() product: any;
  selectedQuantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private cartService: CartService,
    private authService: AuthService,
    private snackBar: MatSnackBar,

    // ✅ ADD THIS
    private seo: SeoService

  ) {}

  ngOnInit(): void {

    window.scrollTo({ top: 0, behavior: 'auto' });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.http.get(`https://boxe-backend.vercel.app/api/products/${id}`).subscribe({
        next: (res: any) => {

          this.product = res;

          if (!this.product.quantity) {
            this.product.quantity = 0;
          }

          this.selectedQuantity = 1;


          // ✅ ADD THIS BLOCK (SEO)
          this.seo.update(
            this.product.title + ' | BOXÉ Official Store',
            this.product.description || 'Shop premium products at BOXÉ. Discover high-quality lifestyle items, accessories, and exclusive collections with fast delivery and secure checkout.'
          );


        },
        error: (err) => {
          console.error('Error fetching product:', err);
        }
      });
    }
  }

  increaseQuantity() {
    if (this.product && this.selectedQuantity < this.product.quantity) {
      this.selectedQuantity++;
    }
  }

  decreaseQuantity() {
    if (this.selectedQuantity > 1) {
      this.selectedQuantity--;
    }
  }

  addToCart() {

    const userId = this.authService.getUserId();

    if (!userId) {
      this.snackBar.open('⚠️ Please log in to add items to your cart.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'cart-snackbar-warning'
      });
      return;
    }

    if (!this.product || this.product.quantity === 0) {
      this.snackBar.open('❌ Product is out of stock.', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'cart-snackbar-error'
      });
      return;
    }

    this.cartService.addToCart(
      userId,
      this.product.id,
      this.selectedQuantity,
      this.product.title,
      this.product.price
    ).subscribe({
      next: () => {
        this.snackBar.open('✅ Added to cart!', 'View Cart', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'cart-snackbar-success'
        });
      },
      error: () => {
        this.snackBar.open('❌ Failed to add to cart.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'cart-snackbar-error'
        });
      }
    });
  }

}