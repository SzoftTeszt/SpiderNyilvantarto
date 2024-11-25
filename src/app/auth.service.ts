import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { GoogleAuthProvider } from '@angular/fire/auth';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedUser:any
  private userSub= new Subject()

  constructor(private afAuth:AngularFireAuth, private router:Router, private http:HttpClient) {
    this.afAuth.authState.subscribe(
      (user:any)=>{
        if (user){
          this.loggedUser=user?._delegate
          user.getIdToken().then(
            (t:any)=>{
              this.loggedUser.token=t
              console.log("token", this.loggedUser.token)
            }
          )
          this.userSub.next(this.loggedUser)
          console.log("User: ",this.loggedUser)
        }
        else this.userSub.next(null)
      }
    )
   }

   getUsers(){
    let apiurl="http://127.0.0.1:5001/spider-116a2/us-central1/api/users"
    const headers= new HttpHeaders().set('Authorization',this.loggedUser.token)
    return this.http.get(apiurl, {headers})
   }

   getLoggedUser(){
    return this.userSub
   }

  googleAuth(){
    return this.afAuth.signInWithPopup(new GoogleAuthProvider())
  }
  signOut(){
    return this.afAuth.signOut()
  }

  signUpMailPassword(email:string, password:string){
    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(()=>{
      this.afAuth.currentUser.then(
        (user)=>{
          user?.sendEmailVerification()
        }
      ).then(
        ()=>this.signOut()
      ).
      then(
        ()=> this.router.navigate(['verifymail'])
      )
      .catch((e)=>alert(e))
    })



  }
  signInMailPassword(email:string, password:string){
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }
}
