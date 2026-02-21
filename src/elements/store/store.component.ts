import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { NeedHelpComponent } from "../need-help/need-help.component";
import { FooterComponent } from "../footer/footer.component";
import { PlantsProductComponent } from "../plants-product/plants-product.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-store',
  imports: [HeaderComponent, NeedHelpComponent, FooterComponent, PlantsProductComponent,CommonModule],
  templateUrl: './store.component.html',
  styleUrl: './store.component.css'
})
export class StoreComponent {
  
// isChatbotOpen = false;
// current=0;
// ngOnInit(){
//   setInterval(() => {
//       this.current = (this.current + 1) % this.banners.length;
//     }, 5000);
// }
// goTo(index: number) {
//     this.current = index;
//   }
//   prev() {
//     this.current = (this.current - 1 + this.banners.length) % this.banners.length;
//   }
//   next() {
//     this.current = (this.current + 1) % this.banners.length;
//   }
//  toggleChatbot() {
//     this.isChatbotOpen = !this.isChatbotOpen;
//   }
}
