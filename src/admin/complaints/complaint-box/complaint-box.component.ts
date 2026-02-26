import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from "../../../elements/header/header.component";
import { FooterComponent } from "../../../elements/footer/footer.component";

@Component({
  selector: 'app-complaint-box',
  imports: [CommonModule, FormsModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './complaint-box.component.html',
  styleUrl: './complaint-box.component.css'
})
export class ComplaintBoxComponent {

  userMessage: string = '';
  successMessage: string = '';
  router: any;

  constructor(private http: HttpClient, router: Router) {}

  sendMessage() {

    if (!this.userMessage.trim()) {

      alert("Please type a message");

      return;

    }

    // ✅ ONLY CHANGE — prefix added
    const messageData = {

      userMessage: this.userMessage.startsWith('BOXÉ:')
        ? this.userMessage
        : `BOXÉ USER : ${this.userMessage}`

    };

    this.http.post('https://backend-bla-bla.onrender.com/api/complaints/send-message', messageData)

      .subscribe({

        next: (res: any) => {

          alert(res.message);

          this.userMessage = '';

          this.successMessage = "Your complaint has been sent successfully!";

          setTimeout(() => {

      
            this.router.navigate(['/show']);

          }, 1000);

        },

        error: (err) => {

          alert("Something went wrong!");

          console.error(err);

        }

      });

  }

}