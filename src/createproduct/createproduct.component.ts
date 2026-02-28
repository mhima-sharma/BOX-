import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProductService } from '../app/service/product.service';

@Component({
  selector: 'app-createproduct',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './createproduct.component.html',
  styleUrl: './createproduct.component.css'
})
export class CreateproductComponent {

  productForm: FormGroup;

  selectedFiles: File[] = [];

  products: any[] = [];


 

  private baseUrl ='https://boxe-backend.vercel.app/api/products';
    // window.location.hostname === 'localhost'
    //   ? 'http://localhost:3000/api/products'
    //   : 'https://backend-plant-website.vercel.app/api/products';
      //  this.apiUrl = 'https://boxe-backend.vercel.app/api/products';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private productService: ProductService
  ) {

    // ✅ added category here
    this.productForm = this.fb.group({

      title: ['', Validators.required],

      category: ['', Validators.required],

      quantity: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/)
      ]],

      price: ['', [
        Validators.required,
        Validators.pattern(/^[0-9.]+$/)
      ]],

      description: ['', Validators.required]

    });

  }


  // ✅ File select
  onFileChange(event: any): void {

    const files = event.target.files;

    if (files && files.length > 0) {

      this.selectedFiles = Array.from(files);

      console.log('Selected files:', this.selectedFiles);

    }

  }


  // ✅ Submit form
  submitForm(): void {

    if (this.productForm.invalid || this.selectedFiles.length === 0) {

      alert('Please fill all fields');

      return;

    }


    const token = localStorage.getItem('token');

    if (!token) {

      alert('Login required');

      return;

    }


    const formData = new FormData();


    // ✅ added category here
    formData.append(
      'title',
      this.productForm.get('title')?.value
    );


    formData.append(
      'category',
      this.productForm.get('category')?.value
    );


    formData.append(
      'quantity',
      this.productForm.get('quantity')?.value
    );


    formData.append(
      'price',
      this.productForm.get('price')?.value
    );


    formData.append(
      'description',
      this.productForm.get('description')?.value
    );


    this.selectedFiles.forEach(file => {

      formData.append('images', file);

    });


    const headers = new HttpHeaders({

      Authorization: `Bearer ${token}`

    });


    this.http.post(this.baseUrl, formData, { headers })

      .subscribe({

        next: (res) => {

          console.log(res);

          alert('Product uploaded successfully');

          this.productForm.reset();

          this.selectedFiles = [];

          this.fetchProducts();

        },

        error: (err) => {

          console.log(err);

          alert(err.error?.message || 'Upload failed');

        }

      });

  }


  // ✅ Fetch products
  fetchProducts(): void {

    this.productService.getAllProducts()

      .subscribe({

        next: (res) => {

          this.products = res;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

}
