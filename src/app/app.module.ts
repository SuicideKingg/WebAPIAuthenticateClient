import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/authenticate/login/login.component';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ListOfProductsComponent } from './components/products/list-of-products/list-of-products.component';
import { ProductFormComponent } from './components/products/product-form/product-form.component';
import { authInterceptor } from './services/auth/auth.interceptor';
import { LoadingHoverComponent } from './components/shared/loading-hover/loading-hover.component';
import { ErrorComponent } from './components/shared/error/error/error.component';
import { NavigationBarComponent } from './components/shared/navigation-bar/navigation-bar/navigation-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListOfProductsComponent,
    ProductFormComponent,
    LoadingHoverComponent,
    ErrorComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [provideHttpClient(
    withInterceptors([authInterceptor])
  )],
  bootstrap: [AppComponent]
})
export class AppModule { }
