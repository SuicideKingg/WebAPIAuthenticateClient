import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {

  /**
   *
   */
  constructor(private router: Router) {
    console.log(router.url)
  }


  isLoginPage(){
    return this.router.url === "/" || this.router.url === "/register";
  }


  title = 'WebAPIAuthenticateClient';
}
