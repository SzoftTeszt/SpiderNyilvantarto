import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  spidersRef : AngularFireList<any>

  constructor(private db: AngularFireDatabase) {
    this.spidersRef=db.list("pokok")
   }

   getSpiders(){
    return this.spidersRef
   }


   pushSpider(){
    let body={name:"Pókica", location:"Gradróbszoba"}
    this.spidersRef.push(body)

   }



}
