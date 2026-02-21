import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.component.html'
})
export class MyOrdersComponent implements OnInit {

  orders: any[] = [];
  loading = true;
  userId = localStorage.getItem('userId');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMyOrders();
  }

  fetchMyOrders() {
    this.http.get<any>(`https://boxe-backend.vercel.app/api/orders/user/${this.userId}`)
      .subscribe({
        next: (res) => {
          this.orders = res.orders;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.loading = false;
        }
      });
  }
}