import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-spiders',
  templateUrl: './spiders.component.html',
  styleUrl: './spiders.component.css'
})
export class SpidersComponent {

  spiders:any

  constructor(private base:BaseService, private auth:AuthService){
    this.base.getSpiders().valueChanges().subscribe(
      (res)=> this.spiders=res
    )
  }

  getUsers(){

  }
  pushSpider(){
    this.base.pushSpider()
  }
}
