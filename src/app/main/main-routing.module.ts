import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { PeopleComponent } from './people/people.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'people'
  },
  {
    path: 'people',
    component: PeopleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
