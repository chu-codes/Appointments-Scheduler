import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

export interface LoginForm {
  email: string;
  password: string;
}

export interface User {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(loginForm: LoginForm) {
    return this.http
      .post<any>('http://localhost:8000/auth/login', {
        email: loginForm.email,
        password: loginForm.password,
      })
      .pipe(
        map((token) => {
          console.log('token');
          localStorage.setItem('blog-token', token.access_token);
          return token;
        })
      );
  }

  signUp(user) {
    return this.http
      .post<any>('http://localhost:8000/auth/register', user)
      .pipe(map((user) => user));
  }
}
