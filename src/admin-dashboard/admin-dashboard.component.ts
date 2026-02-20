import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../app/auth.service';
import { AdminSidebarComponent } from "../app/admin-sidebar/admin-sidebar.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule, AdminSidebarComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  products: any[] = [];
  loading = false;
  errorMessage: string | null = null;
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {
    // Always use HTTPS for production
    this.baseUrl = 'https://boxe-backend.vercel.app/api/products';
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  // ---------------- Fetch Logged-in User's Products ----------------
  fetchProducts(): void {
    const token = this.authService.getRawToken();
    if (!token) {
      alert('You are not logged in.');
      this.router.navigate(['/admin-login']);
      return;
    }

    this.loading = true;
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    this.http.get<any[]>(`${this.baseUrl}/my`, { headers }).subscribe({
      next: (res) => {
        // Filter out products with quantity = 0
        this.products = res.filter(p => p.quantity > 0);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.loading = false;
        if (err.status === 401) {
          alert('Session expired. Please log in again.');
          this.authService.logout();
          this.router.navigate(['/admin-login']);
        } else {
          this.errorMessage = err?.error?.message || 'Failed to fetch products';
        }
      }
    });
  }

  // ---------------- Delete Product ----------------
  deleteProduct(id: number): void {
    const token = this.authService.getRawToken();
    if (!token) {
      alert('Unauthorized');
      return;
    }

    if (!confirm('Are you sure you want to delete this product?')) return;

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http.delete(`${this.baseUrl}/products/${id}`, { headers }).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== id);
        console.log('Product deleted:', id);
      },
      error: (err) => {
        console.error('Error deleting product:', err);
        alert(err?.error?.message || 'Failed to delete product');
      }
    });
  }

  // ---------------- Navigate to Edit Product ----------------
  editProduct(id: number): void {
    this.router.navigate(['/editProduct', id]);
  }
}