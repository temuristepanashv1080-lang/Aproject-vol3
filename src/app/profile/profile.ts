import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiAuth } from '../services/api-auth';
import { Fogort } from "../fogort/fogort";

@Component({
  selector: 'app-profile',
  imports: [Fogort],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  constructor( private api : ApiAuth,  private cdr : ChangeDetectorRef) {}
  ngOnInit(){

    if(localStorage.getItem("userId")!==null){
      this.api.getProfileInfo(localStorage.getItem("userId")!).subscribe({
      next : (resp : any) =>{
        console.log(resp);
        this.profileObj = resp
        this.cdr.detectChanges()
      },
      error : er => alert(er.message)
    })
    
    }
    else {
       this.api.getProfileInfo2().subscribe({
      next : (resp : any) =>{
        console.log(resp);
        this.profileObj = resp
      },
      error : er => alert(er.message)
    })
    
    }

   
  }

  profileObj  : any
}
