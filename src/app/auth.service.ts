import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, catchError, tap } from 'rxjs';

// ---------------- TYPES ----------------
interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthResponse {
  token: string;
  user?: User;
  admin?: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://boxe-backend.vercel.app/api/auth';
  private token$ = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    // Load token from localStorage on app start
    const savedToken = localStorage.getItem('token');
    if (savedToken) this.token$.next(savedToken);
  }

  // ---------------- PUBLIC METHODS ----------------

  signup(data: { name: string; email: string; password: string }): Observable<AuthResponse> {
    return this.post<AuthResponse>('/signup', data);
  }

  login(data: { email: string; password: string }): Observable<AuthResponse> {
    return this.post<AuthResponse>('/login', data).pipe(
      tap(res => {
        if (res.token && res.user) this.setSession(res.token, res.user, 'user');
      })
    );
  }

  signupAdmin(data: { name: string; email: string; password: string }): Observable<AuthResponse> {
    return this.post<AuthResponse>('/admin/signup', data);
  }

  loginAdmin(data: { email: string; password: string }): Observable<AuthResponse> {
    return this.post<AuthResponse>('/admin/login', data).pipe(
      tap(res => {
        if (res.token && res.admin) this.setSession(res.token, res.admin, 'admin');
      })
    );
  }

  logout(): void {
    this.token$.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    return !!this.token$.getValue();
  }

  getToken(): Observable<string | null> {
    return this.token$.asObservable();
  }

  getRawToken(): string | null {
    return this.token$.getValue();
  }

  getUser(): User | null {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }

  getUserId(): number | null {
    const user = this.getUser();
    return user ? user.id : null;
  }

  getUserRole(): 'user' | 'admin' | null {
    const user = this.getUser();
    return user ? user.role : null;
  }

  // ---------------- PRIVATE METHODS ----------------

  private setSession(token: string, user: User, role: 'user' | 'admin') {
    this.token$.next(token);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify({ ...user, role }));
  }

  private getHttpOptions(): { headers: HttpHeaders } {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.getRawToken() ? `Bearer ${this.getRawToken()}` : ''
    });
    return { headers };
  }

  private post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data, this.getHttpOptions()).pipe(
      catchError(err => {
        console.error(`❌ HTTP POST ${endpoint} failed:`, err);
        return throwError(() => err);
      })
    );
  }
}