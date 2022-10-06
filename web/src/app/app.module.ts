import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { LogoComponent } from './Components/logo/logo.component';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './Components/alert/alert.component';
import { ActivateAccountComponent } from './Components/activate-account/activate-account.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    LogoComponent,
    AlertComponent,
    ActivateAccountComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
