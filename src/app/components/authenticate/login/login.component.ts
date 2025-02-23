import { Component } from '@angular/core';
import { AuthServiceService } from '../../../services/auth/auth-service.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private service: AuthServiceService, private router:Router) {}

  // Model
  formModel={
    username:'',
    password:''
  }

  loading = false;
  loginFalied: boolean = false;

  async onSubmit(form: NgForm){
    console.log("Logging In.")
    this.loading = true;
    
    await this.service.login(form.value).then(
      (res:any) =>{
        localStorage.setItem('accessToken', res.accessToken)
        localStorage.setItem('refreshToken', res.refreshToken)
        this.router.navigate(['/product-all']);
      }
    ).catch(
      err =>{
        this.loginFalied = true;
        console.log(err);
      }
    )
    this.loading = false;
    console.log("Logging End.")
  }

}
