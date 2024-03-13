import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InvolvementApplicationComponent} from "./involvement-application.component";
import {InvolvementApplicationRepository} from "./repository/involvement-application.repository";
import {FormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {HierarchyTreeComponent} from "./components/hierarchy-tree.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {SectorRepository} from "./repository/sector.repository";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatTreeModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  declarations: [
    InvolvementApplicationComponent,
    HierarchyTreeComponent,
  ],
  providers: [
    InvolvementApplicationRepository,
    SectorRepository
  ]
})
export class InvolvementApplicationModule { }
