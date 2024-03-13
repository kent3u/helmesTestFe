import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {LoginRepository} from "./repository/login.repository";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    LoginRepository,
  ]
})
export class LoginModule {
}
