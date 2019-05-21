import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './page/home/sign-in/sign-in.component';
import { RegisterComponent } from './page/home/register/register.component';


const routes: Routes = [
  {
    path: '',
    component: SigninComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
