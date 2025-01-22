import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../../services/product/product.service';
import { Product } from '../../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: false,
  
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit{

  product: Product=new Product();
  loading:boolean = false;
  constructor(private activateRoute:ActivatedRoute, private router: Router, private service: ProductService) { }

  /**
   * Component Initialization.
   */
  ngOnInit(): void {
    const param_id = Number(this.activateRoute.snapshot.paramMap.get('id'));
    if(param_id != 0){
      this.populateForm(param_id);
    }
  }

  /**
   * Asyncrhonous. Submits the form data.
   * @param form : Product Form.
   */
  async onSubmit(form: NgForm){
    // console.log(form);
    // console.log(this.product);
    
    this.loading = true;
    await this.service.saveProduct(this.product)
      .then(res => {
          console.log("Save operation");
          console.log(res);
          this.router.navigate(['/product-all']);
        })
      .catch(res =>{
        console.log("Error here..");
        console.log(res);
        this.router.navigate(['/error']);
      })

      console.log("Submit Completed");
      this.loading = false;
  }

  /**
   * Populates the form based on Id.
   */
  private populateForm(id:number){
    this.service.getProduct(id)
    .then(res=>{
      console.log("getting product");
      console.log(res);
      this.product = res as Product;
    })
    .catch(res =>{
      console.log("Error here..");
      console.log(res);
      this.router.navigate(['/error']);
    })

    console.log("Retrieve Completed");
  }

  /**
   * Click Event for the 'Go Back to List' button.
   */
  goBackToList(){
    this.router.navigate(['/product-all']);
  }
  
}
