import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./auth.guard";
import {InvolvementApplicationComponent} from "./involvement-application/involvement-application.component";

const appRoutes: Routes = [
  { path: '',   redirectTo: '/application', pathMatch: 'full' },
  { path: 'application', component: InvolvementApplicationComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
