import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  
  email=""
  password=""
  emailPassError=false
  emailPassMessage=""

  constructor(private auth:AuthService, private router:Router){}

  googleAuth(){
    this.auth.googleAuth()
      .then(
        ()=>
          {
            console.log("Beléptél Google-val!")
            this.router.navigate(['spiders'])
          }
    )

      .catch(()=>console.log("Hiba a Google belépésnél!"))
  }

  facebookAuth(){
    this.auth.facebookAuth()
      .then(
        ()=>
          {
            console.log("Beléptél Facebook-val!")
            this.router.navigate(['spiders'])
          }
    )

      .catch(()=>console.log("Hiba a Facebook belépésnél!"))
  }

  signIn(){
    console.log(this.email,"; ",this.password)
    this.auth.signInMailPassword(this.email, this.password).then(
      ()=>this.router.navigate(["spiders"])
    ).catch(
      (e)=>{
        if (e.code!=4002){
          this.emailPassError=true
          this.emailPassMessage=e
        }else{
          this.router.navigate(["spiders"])
        }

      }
    )

  }

  forgotPassword(){
    this.auth.forgotPassword(this.email)
  }
}
