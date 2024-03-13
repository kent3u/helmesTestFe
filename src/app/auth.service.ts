import {Injectable} from '@angular/core';
import {Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import {HttpStatusCode} from "@angular/common/http";
import {LoginRoutes} from "./login/login-routes";
import {LoginRepository} from "./login/repository/login.repository";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private loginRepository: LoginRepository,
              private router: Router) {
  }

  logIn(username: string, password: string): Observable<any> {
    return this.loginRepository.logIn(username, password)
      .pipe(
        tap((response: any) => {
          if (response.status == HttpStatusCode.Ok) {
            localStorage.setItem('auth_token', response.headers.get('access_token'));
          }
        })
      );
  }

  logOut(): void {
    localStorage.removeItem('auth_token');
    this.router.navigate([LoginRoutes.login()])
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getToken(): string {
    return localStorage.getItem('auth_token') || "";
  }
}
