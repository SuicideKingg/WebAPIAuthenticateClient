import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authenticate/login/login.component';
import { ListOfProductsComponent } from './components/products/list-of-products/list-of-products.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { ErrorComponent } from './components/shared/error/error/error.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'product-all',component:ListOfProductsComponent},
  {path:'product-form-add',component:ProductFormComponent},
  {path:'product-form-update/:id',component:ProductFormComponent},
  {path:'error',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
