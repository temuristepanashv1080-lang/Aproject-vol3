import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiAuth } from '../services/api-auth';

@Component({
  selector: 'app-fogort',
  imports: [FormsModule],
  templateUrl: './fogort.html',
  styleUrl: './fogort.scss',
})
export class Fogort {
  constructor(private api : ApiAuth, private cdr : ChangeDetectorRef) {}

  @Input() email : string = ""
  @Input() changeOrdForgot = ""


  changePassword(data : any){

      debugger
      this.api.forgort(data).subscribe({

        next : (resp : any) =>{
          alert("password changed successfully")
        },
        error : er => alert(er.message)
      })

  }

  sendPassword()
{

}}
