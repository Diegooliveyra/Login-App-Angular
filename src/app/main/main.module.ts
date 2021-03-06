import { MainRoutingModule } from './main-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleComponent } from './people/people.component';
import { ProductsComponent } from './products/products.component';



@NgModule({
  declarations: [
    PeopleComponent,
    ProductsComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports:[
    MainRoutingModule
  ]
})
export class MainModule { }
