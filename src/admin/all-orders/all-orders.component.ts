import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdminSidebarComponent } from "../admin-sidebar/admin-sidebar.component";

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [CommonModule, AdminSidebarComponent],
  templateUrl: './all-orders.component.html'
})
export class AllOrdersComponent implements OnInit {

  orders: any[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders() {
    this.http.get<any>('https://boxe-backend.vercel.app/api/orders')
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