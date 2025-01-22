import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  readonly url = environment.apiUrl + "/product";  
  constructor(private http: HttpClient) { }

  /**
   * Calls the web api 'GET' endpoint to get all Products
   * @returns Observable<Product[]>
   */
  getAll(pageNumber: number,pageSize: number){
    const headers = this.getTokenHeder();
    return this.http.get<Product[]>(this.url+"/getall?pagenumber="+ pageNumber +"&pageSize=" + pageSize, {headers}).toPromise();
  }

  /**
   * Calls the web api 'GET' endpoint to get Product entity based on Id.
   * @param id Product Id.
   * @returns Promise<Product>
   */
  getProduct(id:number){
    const headers = this.getTokenHeder();
    var test = this.http.get<Product>(this.url+"/getProduct/"+id, {headers}).toPromise(); 
    console.log(test);
    return test;
  }

  /**
   * Calls the web api 'POST'/'PUT' end point to add or update Product entity.
   * @param product Product model. If Id is 0 then it wil call the 'Post' endpoint to create, otherwise it will call the 'Put' endpoint to update.
   * @returns Promise
   */
  saveProduct(product:Product){
    const headers = this.getTokenHeder();
    if(product.id == 0){
      return this.http.post(this.url+"/create",product,{headers}).toPromise();
    }
    else{
      return this.http.put(this.url+"/update/"+product.id,product,{headers}).toPromise();
    }
  }

  /**
   * Calls the web api 'DELETE' endpoint to delete a product based on Id.
   * @param id Product Id.
   * @returns Promise
   */
  deleteProduct(id:number){
    const headers = this.getTokenHeder();
    return this.http.delete(this.url+"/delete/"+id,{headers}).toPromise();
  }

  /**
   * Gets the JWT token header from the local storage.
   * @returns Authorization Http Header. {'Authorization' : 'Bearer jwt-token'}
   */
  private getTokenHeder(){
    var token = localStorage.getItem('token');
    return { 'Authorization': 'Bearer ' + token};
  }
}
