import { Component } from '@angular/core';
import { HeaderComponent } from "../../elements/header/header.component";
import { FooterComponent } from "../../elements/footer/footer.component";
import { CartComponent } from '../../elements/cart/cart.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart-display',
  imports: [HeaderComponent, FooterComponent, CartComponent, CommonModule],
  templateUrl: './cart-display.component.html',
  styleUrl: './cart-display.component.css'
})
export class CartDisplayComponent {

}
