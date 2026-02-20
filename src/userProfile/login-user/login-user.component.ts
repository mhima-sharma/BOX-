import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../app/auth.service';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  loading = false; // optional: to show a spinner while logging in
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMessage = null;

    const { email, password } = this.loginForm.value;
    this.authService.login({ email, password }).subscribe({
      next: (res) => {
        if (!res.token || !res.user) {
          this.errorMessage = 'Login failed: invalid server response';
          this.loading = false;
          return;
        }

        // Save token and user info via AuthService session handling
        this.authService.logout(); // clear any previous session
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));

        this.router.navigate(['/show']);
        this.loading = false;
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage = err?.error?.details || err?.error?.error || 'Login failed';
        this.loading = false;
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}