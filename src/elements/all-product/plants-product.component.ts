import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../app/service/product.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plants-product',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './plants-product.component.html',
  styleUrls: ['./plants-product.component.css']
})
export class PlantsProductComponent implements OnInit {

  products: any[] = [];

  searchQuery: string = '';

  showAll: boolean = false;

  categories: string[] = [
    'Watches',
    'Jewelry',
    'Perfumes',
    'Soft Toys',
    'Gift Hampers',
    'Chocolates',
    'Flowers',
    'Greeting Cards',
    'Luxury Gifts',
    'Corporate Gifts'
  ];

  selectedCategory: string = 'All';


  constructor(
    private productService: ProductService,
    private router: Router
  ) { }


  ngOnInit(): void {

    this.fetchAllProducts();

  }


  // ✅ Fetch products
  fetchAllProducts(): void {

    this.productService.getAllProducts().subscribe({

      next: (res) => {

        console.log('API Response:', res);

        this.products = res.filter(
          (product: any) => product.quantity > 0
        );

      },

      error: (err) => {

        console.error('Error fetching products', err);

      }

    });

  }



  // ✅ View Details
  viewDetails(id: number): void {

    this.router.navigate(['/product', id]);

  }



  // ✅ Search handler
  onSearch(event: Event): void {

    event.preventDefault();

  }



  // ✅ Filtered Products
  get filteredProducts(): any[] {

    const query = this.searchQuery.toLowerCase().trim();

    return this.products.filter(product => {

      const matchesSearch =

        !query ||

        product.title?.toLowerCase().includes(query) ||

        product.description?.toLowerCase().includes(query);



      const matchesCategory =

        this.selectedCategory === 'All' ||

        product.category === this.selectedCategory;



      return matchesSearch && matchesCategory;

    });

  }



  // ✅ Category Products (MOST IMPORTANT FUNCTION)
  getProductsByCategory(category: string): any[] {

    return this.filteredProducts.filter(

      product => product.category === category

    );

  }



  // Optional
  get visibleProducts(): any[] {

    return this.showAll

      ? this.filteredProducts

      : this.filteredProducts.slice(0, 8);

  }



  toggleShowAll(): void {

    this.showAll = !this.showAll;

  }

}