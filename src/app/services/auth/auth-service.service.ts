import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  readonly url = environment.apiUrl + "/authenticate";
  constructor(private http:HttpClient, private router: Router) { }

  /**
   * Login the user.
   * @param formData Login Model. { 'username':'your-user-name', 'password':'your-password'}
   * @returns Observable<Object>
   */
  login(formData: any){
    return this.http.post(this.url +"/login", formData).toPromise();
  }
  
  /**
   * Register new user.
   * @param formData Register Model. { 'email':'your-email@email.com','username':'your-user-name', 'password':'your-password'}
   * @returns 
   */
  register(formData: any){
    return this.http.post(this.url + "/register", formData).toPromise();
  }

  /**
   * Logout the current user.
   * 
   * TODO: Identify on how the Server/Backend will invalidate the removed token. It will removed on the web browser's storage but the token is still valid.
   */
  logout(){
    localStorage.removeItem('token');    
  }
}
