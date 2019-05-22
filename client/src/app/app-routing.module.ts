import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './page/home/sign-in/sign-in.component';
import { RegisterComponent } from './page/home/register/register.component';
import { MainComponent } from './page/home/main/main.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'sign-in',
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
