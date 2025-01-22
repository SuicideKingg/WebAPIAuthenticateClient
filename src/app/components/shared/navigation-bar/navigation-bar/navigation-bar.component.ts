import { Component } from '@angular/core';
import { AuthServiceService } from '../../../../services/auth/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  standalone: false,
  
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  /**
   *
   */
  constructor(private authService:AuthServiceService, private router:Router) {}

  logOut(){
    this.authService.logout();
    this.router.navigate(['']);
  }
}
