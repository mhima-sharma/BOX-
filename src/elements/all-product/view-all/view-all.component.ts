import { Component, TemplateRef } from '@angular/core';

import { CommonModule, NgIfContext } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { ProductService } from '../../../app/service/product.service';


@Component({
  selector: 'app-view-all',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})


export class ViewAllComponent {

  products: any[] = [];

  searchQuery: string = '';

  categories: string[] = [];

  selectedCategory: string = 'All';

  noResults: TemplateRef<NgIfContext<boolean>> | null | undefined;



  constructor(
    private productService: ProductService,
    private router: Router
  ) {}



  ngOnInit(): void {

    this.fetchAllProducts();

  }




  fetchAllProducts(): void {

    this.productService.getAllProducts().subscribe({

      next: (res) => {

        console.log('API Response:', res);


        this.products = res.filter(

          (product: any) => product.quantity > 0

        );


        // Extract categories dynamically

        this.categories = [

          'All',

          ...new Set(

            this.products.map(

              (product: any) => product.category

            )

          )

        ];

      },


      error: (err) => {

        console.error('Error fetching products', err);

      }

    });

  }




  viewDetails(id: number): void {

    this.router.navigate(['/product', id]);

  }




  selectCategory(category: string): void {

    this.selectedCategory = category;

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


}