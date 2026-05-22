import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {

   isAuth = signal(false)


  singIn(){
    this.isAuth.set(true)
  }

  singOut(){
    this.isAuth.set(false)
  }
}
