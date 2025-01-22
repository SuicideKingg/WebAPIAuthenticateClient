import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { Product } from '../../../models/product.model';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../services/auth/auth-service.service';

@Component({
  selector: 'app-list-of-products',
  standalone: false,
  
  templateUrl: './list-of-products.component.html',
  styleUrl: './list-of-products.component.css'
})
export class ListOfProductsComponent implements OnInit{

  products: Product[] = [];
  loading = false;
  pageNumber:number = 1;
  pageSize:number = 5;
  constructor(private router: Router,private service:ProductService, private authService:AuthServiceService) {}
  
  async ngOnInit() {
    this.loading = true;
    await this.refreshList();
    this.loading = false;
  }

  addNewProduct(){
    this.router.navigate(['/product-form-add']);
  }

  updateProduct(id:number){
    this.router.navigate(['/product-form-update/'+id]);
  }

  async deleteProduct(id:number){
    this.loading = true;
    await this.service.deleteProduct(id).then(
      res=>{
        this.products = res as Product[]
      }
    )
    .catch(
      res=>{
        console.log("Error here..");
        console.log(res);
        this.router.navigate(['/error']);
      }
    );
    this.loading = false;
  }

  // Pagination Click Events
  async nextPage(){
    this.pageNumber++;
    await this.refreshList();
  }

  async previousPage(){
    if(this.pageNumber > 1){
      this.pageNumber--;
      await this.refreshList();
    }
  }

  async firstPage(){
    this.pageNumber = 1;
    await this.refreshList();
  }

  async lastPage(){
    //
  }

  async pageSizeChange(size:string){
    // TODO: Add try catch block here.
    this.pageSize = Number(size);
    await this.refreshList();
  }

  async refreshList(){
    await this.service.getAll(this.pageNumber,this.pageSize).then(
      (list) => {
        console.log("Product list");
        this.products = list as Product[];
        console.log(list);
      }).catch(
      (err) => {
        console.log("Error occured");
        console.log(err);
        this.router.navigate(['/error']);
      }
    );
  }

}
