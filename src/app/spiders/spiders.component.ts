import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { AuthService } from '../auth.service';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-spiders',
  templateUrl: './spiders.component.html',
  styleUrl: './spiders.component.css'
})
export class SpidersComponent {

  spiders:any
  character:any

  constructor(private base:BaseService, private auth:AuthService, private email:EmailService){
    this.base.getSpiders().valueChanges().subscribe(
      (res)=> this.spiders=res
    )
  }

  getUsers(){

  }
  pushSpider(){
    this.base.pushSpider()
  }

  sendMail(){
    this.email.sendMail()
  }

  getCharacter(){
    this.auth.getCharacter().subscribe(
      (res)=>this.character=res
    )
  }
}
