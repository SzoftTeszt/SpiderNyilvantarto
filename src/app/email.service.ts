import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser'

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  templateParams:any = {
    name: 'James',
    fromName:"Próba Név",
    notes: 'Notes',
    message:"Üzenet neked!",
    reply_to:"jagerattila@gmail.com",
    from_address:"jagerattila@gmail.com",
    cc_address:"jagerattila@gmail.com;oliver76510@gmail.com",
    bcc_address:"jager.attila@ktch.hu"
  };

  constructor() { }

  sendMail(){
  emailjs.send('service_sp0nxd4', 'template_kckc4zh', this.templateParams,'Public_Key').then(
    (response) => {
      console.log('SUCCESS!', response.status, response.text);
    },
    (error) => {
      console.log('FAILED...', error);
    },
  );
}
}
