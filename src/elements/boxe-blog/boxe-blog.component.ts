import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boxe-blog',
  imports: [HeaderComponent, FooterComponent , CommonModule],
  templateUrl: './boxe-blog.component.html',
  styleUrl: './boxe-blog.component.css'
})
export class BoxeBlogComponent {

}
