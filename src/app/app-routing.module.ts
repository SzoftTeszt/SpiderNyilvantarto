import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpidersComponent } from './spiders/spiders.component';
import { SignUPComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';

const routes: Routes = [
  {path:"spiders", component:SpidersComponent},
  {path:"signup", component:SignUPComponent},
  {path:"signin", component:SignInComponent},
  {path:"verifymail", component:VerifyemailComponent},
  {path:"", redirectTo:"signup", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }