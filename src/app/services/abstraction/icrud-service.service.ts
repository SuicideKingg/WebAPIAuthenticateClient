import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class ICrudServiceService {

  constructor() { }

  abstract getAll(pageNumber?:number,pageSize?:number):void;
  
}
