import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatRadioButton} from '@angular/material/radio';
import {MatCard, MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDrawer, MatDrawerContainer, MatSidenavModule} from '@angular/material/sidenav';
import {MatInput} from '@angular/material/input';


const MaterialComponents = [
  MatRadioButton,
  MatCardModule,
  MatSelectModule,
  MatToolbarModule,
  MatButtonModule,
  MatDrawerContainer,
  MatSidenavModule,
  MatDrawer,
  MatInput
];
@NgModule({
  declarations: [],
  imports: [
    MaterialComponents,
  ],
  exports: [MaterialComponents]
})
export class MaterialModule { }
