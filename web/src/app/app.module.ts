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
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { RegisteredAccountComponent } from './Components/registered-account/registered-account.component';
import { VarifyAccountComponent } from './Components/varify-account/varify-account.component';
import { PrincipalComponent } from './Components/principal/principal.component';
import { PrincipalSidebarComponent } from './Components/principal-sidebar/principal-sidebar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { PrincipalDashboardComponent } from './Components/principal-dashboard/principal-dashboard.component';
import { ClassesComponent } from './Components/classes/classes.component';
import { SubjectsComponent } from './Components/subjects/subjects.component';
import { TeachersComponent } from './Components/teachers/teachers.component';
import { ClerksComponent } from './Components/clerks/clerks.component';
import { TimetableComponent } from './Components/timetable/timetable.component';
import { AttendancesComponent } from './Components/attendances/attendances.component';
import { AssignmentsComponent } from './Components/assignments/assignments.component';
import { ReportsComponent } from './Components/reports/reports.component';
import { FeesComponent } from './Components/fees/fees.component';
import { SalariesComponent } from './Components/salaries/salaries.component';
import { NewsComponent } from './Components/news/news.component';
import { ChatsComponent } from './Components/chats/chats.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    LogoComponent,
    AlertComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    RegisteredAccountComponent,
    VarifyAccountComponent,
    PrincipalComponent,
    PrincipalSidebarComponent,
    FooterComponent,
    PrincipalDashboardComponent,
    ClassesComponent,
    SubjectsComponent,
    TeachersComponent,
    ClerksComponent,
    TimetableComponent,
    AttendancesComponent,
    AssignmentsComponent,
    ReportsComponent,
    FeesComponent,
    SalariesComponent,
    NewsComponent,
    ChatsComponent,
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
