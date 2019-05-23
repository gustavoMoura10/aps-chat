import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './page/home/login/login.component';
import { RegisterComponent } from './page/home/register/register.component';
import { MainComponent } from './page/home/main/main.component';
import { MainChatComponent } from './page/chat/main-chat/main-chat.component';
import { AuthGuard } from './services/auth/auth.guard';
import { FreeGuard } from './services/auth/free.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [FreeGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [FreeGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [FreeGuard]
  },
  {
    path: 'user/:userName',
    component: MainChatComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
