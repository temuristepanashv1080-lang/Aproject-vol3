import { Component, inject } from '@angular/core';
import { ApiAuth } from '../services/api-auth';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {


  constructor(private apiAuth : ApiAuth, private router : Router){

  }
  fb = new FormBuilder()

  myRegisterForm = this.fb.group({
     firstName : ["John", [Validators.required, Validators.minLength(3)]],
     lastName : ["", [Validators.required, Validators.minLength(3)]],
     age : ["", [Validators.required, Validators.min(0)]],
     email : ["", [Validators.required, Validators.email, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
     password : ["", [Validators.required, Validators.minLength(8)]],
     address : [""],
     phone : [""],
     zipcode : [""],
     avatar : [""],
     gender : ["FEMALE"]

  })





  // https://api.everrest.educata.dev/auth/sign_up


  register(){
    console.log(this.myRegisterForm.value);
    console.log(this.myRegisterForm.invalid);

    if(!this.myRegisterForm.invalid){
       this.apiAuth.register(this.myRegisterForm.value).subscribe({
          next : (resp : any) =>{
               console.log(resp);
               localStorage.setItem("userId", resp._id)
          },

          error : er => alert(er.message)
       })
    }
    
    
  }





}



// Password123
// haseban257@poisonword.com