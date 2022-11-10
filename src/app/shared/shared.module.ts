import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';


//MATERIAL
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import { TableComponent } from './components/table/table.component';




@NgModule({
  declarations: [
    NavbarComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    //MATERIAL
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,

  ],
  exports: [
    NavbarComponent,
    TableComponent,
    RouterModule,
    //MATERIAL
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
  ]
})
export class SharedModule { }
