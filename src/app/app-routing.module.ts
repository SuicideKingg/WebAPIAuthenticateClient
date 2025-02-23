import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authenticate/login/login.component';
import { ListOfProductsComponent } from './components/products/list-of-products/list-of-products.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { ErrorComponent } from './components/shared/error/error/error.component';
import { AuthGard } from './route-guard/auth-gard';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'product-all',component:ListOfProductsComponent,canActivate:[AuthGard]},
  {path:'product-form-add',component:ProductFormComponent,canActivate:[AuthGard]},
  {path:'product-form-update/:id',component:ProductFormComponent,canActivate:[AuthGard]},
  {path:'error',component:ErrorComponent,canActivate:[AuthGard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
