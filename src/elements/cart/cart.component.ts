import { CommonModule } from '@angular/common';
import { Component, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { CartService } from '../../app/service/cart.service';
import { BuynowComponent } from '../buynow/buynow.component';
import { AuthService } from '../../app/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {

  showCartSummary = false;
  cartItems: any[] = [];
  userId: number | null = null;
 isCartOpen = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    @Optional() public dialogRef: MatDialogRef<CartComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.userId = userId;
      this.loadCart();
    } else {
      console.error('User not logged in!');
    }
  }

  loadCart(): void {
    if (this.userId === null) return;

    this.cartService.getCartItems(this.userId).subscribe({
      next: (res: any[]) => {
        this.cartItems = res;
        this.cartService.notifyCartUpdated();
      },
      error: (err) => {
        console.error('Failed to load cart:', err);
      },
    });
  }

  // close(): void {
  //   if (this.dialogRef) {
  //     this.dialogRef.close();
  //   }
  // }
  close() {
  this.isCartOpen = false;
}

  onBuyNow(): void {
    const dialogRef = this.dialog.open(BuynowComponent, {
      // width: '1000px',
      disableClose: false,
      data: { cart: this.cartItems },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadCart();
    });
  }

  increaseQuantity(item: any): void {
    item.quantity++;
    this.updateBackend(item);
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateBackend(item);
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item: any): void {
    const index = this.cartItems.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);

      this.cartService.removeCartItem(item.id).subscribe({
        next: () => {
          console.log('Item removed');
          this.cartService.notifyCartUpdated();
        },
        error: (err: any) => {
          console.error('Failed to remove item:', err);
        },
      });
    }
  }

  updateBackend(item: any): void {
    this.cartService.updateCartItem(item).subscribe({
      next: () => {
        console.log('Quantity updated');
        this.cartService.notifyCartUpdated();
      },
      error: (err: any) => {
        console.error('Failed to update quantity:', err);
      },
    });
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }
}