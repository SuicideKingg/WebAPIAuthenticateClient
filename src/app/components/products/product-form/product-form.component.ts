import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { Product } from '../../../models/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent implements OnInit{

  product: Product=new Product();
  loading:boolean = false;
  isEditForm:boolean = false;
  productFormGroup!: FormGroup;
  formSubmitted= false;

  constructor(private activateRoute:ActivatedRoute, private router: Router, private service: ProductService) { }

  /**
   * Component Initialization.
   */
  ngOnInit():void {
    const param_id = Number(this.activateRoute.snapshot.paramMap.get('id'));
    if(param_id != 0){
      this.isEditForm=true;
      this.populateForm(param_id);
    }

    this.formSubmitted = false;
    this.productFormGroup = new FormGroup({
      id: new FormControl(0),
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      price: new FormControl(0,[Validators.required, Validators.min(1)]),
      description: new FormControl('')
    });

  }

  /**
   * Form component for Product.Name
   */
  get name(){
    return this.productFormGroup.get('name') as FormControl;
  }

  /**
   * Checks if the Name field is invalid.
   */
  get nameIsInvalid(): boolean{
    return (this.name.touched || this.formSubmitted) && this.name.invalid;
  }

  /**
   * Form component for Product.Price
   */
  get price(){
    return this.productFormGroup.get('price') as FormControl;
  }

  /**
   * Checks if the Price field is invalid.
   */
  get priceIsInvalid(): boolean{
    return (this.price.touched || this.formSubmitted) && this.price.invalid;
  }

  /**
   * Asyncrhonous. Submits the form data.
   * @param form : Product Form.
   */
  async onSubmit(){
    this.formSubmitted = true;
    console.log(this.name.hasError('maxLength'));
    if(this.productFormGroup.valid){
      this.product = this.productFormGroup.value;
      console.log(this.product);
      this.loading = true;
      await this.service.saveProduct(this.product)
        .then(res => {
            console.log(res);
            this.router.navigate(['/product-all']);
          })
        .catch(res =>{
          console.log(res);
          this.router.navigate(['/error']);
      })
      this.loading = false;
    }
  }

  /**
   * Populates the form based on Id.
   */
  private populateForm(id:number){
    this.service.getProduct(id)
    .then(res=>{
      console.log("getting product");
      console.log(res);

      // TODO: Once the category is implemented, do direct setValue and put the res as Product on it.
      let product = res as Product;
      console.log(product);
      this.productFormGroup.setValue({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description
      });
      console.log(this.productFormGroup.value);
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
