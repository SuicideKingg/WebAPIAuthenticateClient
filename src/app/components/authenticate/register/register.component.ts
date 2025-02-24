import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterValidationService } from '../../../services/custom-validations/register-validation.service';
import { AuthServiceService } from '../../../services/auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  registerForm!:FormGroup;
  formSubmitted:boolean = false;
  loading:boolean = false;

  constructor(private customValidator:RegisterValidationService, private fb:FormBuilder, private authService:AuthServiceService, private route: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.compose([Validators.required, this.customValidator.patternValidator()])]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validator: this.customValidator.MatchPassword('password','confirmPassword')
    });
  }
  
  /**
   * Gets the object of Form Control type of the Form Group.
   * @param controlName Name of the control from the Form Group.
   * @returns Form control of the Form Group.
   */
  getFormControl(controlName: string):FormControl{
    return this.registerForm.get(controlName) as FormControl;
  }

  /**
   * Checks if the Form Control is valid.
   * @param controlName Name of the control from the Form Group.
   * @returns A boolean value if the form control is valid.
   */
  isControlInvalid(controlName: string):boolean{
    let ctrlToCheck = this.getFormControl(controlName);
    return (ctrlToCheck.touched || this.formSubmitted) && ctrlToCheck.invalid;
  }

  /**
   * Asyncrhonous. Submits the form data.
   * @param form : Register Form.
   */
  async onSubmit(){
    this.formSubmitted = true;
    if(this.registerForm.valid){
      this.loading = true;
      await this.authService.register(this.registerForm.value).then((res)=>{
        alert("User created");
        this.route.navigate(['']);
      }).catch((_) =>{
        alert("Error occured");
      });
      this.loading = false;
    }
  }

}
