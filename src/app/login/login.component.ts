import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {first} from "rxjs";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginValid: boolean = true;
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logInWithRedirect(): void {
    this.loginValid = true;

    this.authService.logIn(this.username, this.password)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['/application']);
        },
        error: () => {
          this.loginValid = false;
        }
      })
  }

}
