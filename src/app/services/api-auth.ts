import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiAuth {

     
     constructor(private http : HttpClient){


      }

      login(obj : any){
        return this.http.post("https://api.everrest.educata.dev/auth/sign_in", obj)

      }

      register(obj : any){
         return this.http.post("https://api.everrest.educata.dev/auth/sign_up", obj)
      }


      getProfileInfo(id : string){
          return this.http.get(`https://api.everrest.educata.dev/auth/id/${id}`, {

             headers : {
                  "Authorization": `Bearer ${localStorage.getItem("access_token")}`,

             }
          })

      }
       getProfileInfo2(){
          return this.http.get(`https://api.everrest.educata.dev/auth`, {

             headers : {
                  "Authorization": `Bearer ${localStorage.getItem("access_token")}`,

             }
          })

      }


      forgort(obj : any){
         return this.http.patch("https://api.everrest.educata.dev/auth/change_password", obj,{

             headers : {
                  "Authorization": `Bearer ${localStorage.getItem("access_token")}`,

             }
          })

      }

      
}
