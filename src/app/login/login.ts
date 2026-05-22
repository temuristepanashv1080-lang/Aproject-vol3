import { Component } from '@angular/core';
import { ApiAuth } from '../services/api-auth';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../services/auth';
import { FormsModule } from '@angular/forms';
import { Fogort } from '../fogort/fogort';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule, Fogort],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

    constructor(private apiAuth : ApiAuth, private router : Router, private auth : Auth){

  }


  email = ""
  password = ""  
  // 
   

  login(form : any){

     this.apiAuth.login(form.value).subscribe({
        next : ((resp : any) =>{
             console.log(resp);
             localStorage.setItem("access_token", resp.access_token)
             localStorage.setItem("refresh_token", resp.refresh_token)
             this.router.navigateByUrl("/home")
             this.auth.singIn()

        }),
        error : er => alert(er.message)
     })
   
  }
  forgotShow = false
  fogort(){
   this.forgotShow = true
  }
}
