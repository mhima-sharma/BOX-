import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { AdminDashboardComponent } from "../admin-dashboard/admin-dashboard.component";
import { ManageProductsComponent } from "../manage-products/manage-products.component";
import { AllOrdersComponent } from "../all-orders/all-orders.component";
import { CreateproductComponent } from "../../createproduct/createproduct.component";

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, AdminDashboardComponent, ManageProductsComponent, AllOrdersComponent, CreateproductComponent],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
selectedComponent = 'dashboard';


  showComponent(componentName: string) {

    this.selectedComponent = componentName;

  }


}

