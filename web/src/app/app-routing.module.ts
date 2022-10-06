import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ActivateAccountComponent } from './Components/activate-account/activate-account.component';

import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'activateaccount', component: ActivateAccountComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
