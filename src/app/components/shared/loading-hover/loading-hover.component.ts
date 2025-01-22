import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-hover',
  standalone: false,
  
  templateUrl: './loading-hover.component.html',
  styleUrl: './loading-hover.component.css'
})

export class LoadingHoverComponent {
  @Input() loadingText:string = "Please Wait...";
}
