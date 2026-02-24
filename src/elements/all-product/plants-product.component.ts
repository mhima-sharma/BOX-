import { Component, TemplateRef } from '@angular/core';
import { ProductService } from '../../app/service/product.service';
import { CommonModule, NgIfContext } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CategoryFilterPipe } from "./category-filter.pipe";

@Component({
  selector: 'app-plants-product',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, CategoryFilterPipe],
  templateUrl: './plants-product.component.html',
  styleUrls: ['./plants-product.component.css']
})
export class PlantsProductComponent {
  products: any[] = [];
  searchQuery: string = '';
  showAll: boolean = false;
  categories: string[] = ['Watches', 'Jewelry', 'Perfumes' , 'Soft Toys', 'Gift Hampers', 'Chocolates', 'Flowers', 'Greeting Cards', 'Luxury Gifts', 'Corporate Gifts'];
  selectedCategory: string = 'All';
noResults: TemplateRef<NgIfContext<boolean>> | null | undefined;
  

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.fetchAllProducts();
  }


  getProductsByCategory(category: string) {
  return this.filteredProducts.filter(
    product => product.category === category
  );
}

  fetchAllProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        console.log('API Response:', res);
        this.products = res.filter((product: any) => product.quantity > 0);
      },
      error: (err) => {
        console.error('Error fetching products', err);
      }
    });
  }

  viewDetails(id: number): void {
    this.router.navigate(['/product', id]);
  }

  onSearch(event: Event): void {
    event.preventDefault();
  }

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

  get visibleProducts(): any[] {
    return this.showAll ? this.filteredProducts : this.filteredProducts.slice(0, 8);
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
  }
}
