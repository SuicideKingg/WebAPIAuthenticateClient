import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  if(localStorage.getItem('token') == null){
    console.log("Intereceptor start..");
    inject(Router).navigate(['']);
    // TODO: It seems that we need to return different delegate.
  }
  return next(req);
};
