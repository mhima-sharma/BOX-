import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from "../admin-dashboard/admin-dashboard.component";
import { ManageProductsComponent } from "../manage-products/manage-products.component";
import { AllOrdersComponent } from "../all-orders/all-orders.component";
import { CreateproductComponent } from "../../createproduct/createproduct.component";




@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    AdminDashboardComponent,
    ManageProductsComponent,
    AllOrdersComponent,
    CreateproductComponent
],
  templateUrl: './admin-sidebar.component.html'
})
export class AdminSidebarComponent implements OnInit {
  mobileMenuOpen = false;

  selectedComponent: string = 'dashboard';   // ✅ DEFAULT FIX

  ngOnInit(): void {
    this.selectedComponent = 'dashboard';    // extra safety
  }

  showComponent(component: string) {
    this.selectedComponent = component;
  }
}
