import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUPComponent {
  username=""
  email=""
  password=""
  passwordAgain=""

  emailPassError=false
  emailPassMessage=""

  constructor(private auth:AuthService, private router:Router){}

  googleAuth(){
    this.auth.googleAuth()
      .then(
        ()=>
          {
            console.log("Sikeres Google regiszráció!")
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
            console.log("Sikeres Facebook regiszráció!")
            this.router.navigate(['spiders'])
          }
    )

      .catch(()=>console.log("Hiba a Facebook belépésnél!"))
  }

  signUpMailPassword(){
    console.log(this.email,"; ",this.password)
    this.auth.signUpMailPassword(this.email, this.password)
    
  //   .then(
  //     ()=>this.router.navigate(["spider"])
  //   ).catch( 
  //     (e)=>{
  //     if (e.code!=4002){
  //       this.emailPassError=true
  //       this.emailPassMessage=e
  //     }else{
  //       this.router.navigate(["spiders"])
  //     }

  //   }
  // )

}
}
