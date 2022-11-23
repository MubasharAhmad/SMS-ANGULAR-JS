import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { LogoComponent } from './Components/logo/logo.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { AlertComponent } from './Components/alert/alert.component';
import { FooterComponent } from './Components/footer/footer.component';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ActivateAccountComponent } from './pages/auth/activate-account/activate-account.component';
import { RegisteredAccountComponent } from './pages/auth/registered-account/registered-account.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './pages/auth/change-password/change-password.component';

import { PrincipalComponent } from './pages/principal/principal/principal.component';
import { PrincipalSidebarComponent } from './pages/principal/principal-sidebar/principal-sidebar.component';
import { PrincipalDashboardComponent } from './pages/principal/principal-dashboard/principal-dashboard.component';
import { ClassesComponent } from './pages/principal/classes/classes.component';
import { SubjectsComponent } from './pages/principal/subjects/subjects.component';
import { TeachersComponent } from './pages/principal/teachers/teachers.component';
import { ClerksComponent } from './pages/principal/clerks/clerks.component';
import { TimetableComponent } from './pages/principal/timetable/timetable.component';
import { AttendancesComponent } from './pages/principal/attendances/attendances.component';
import { AssignmentsComponent } from './pages/principal/assignments/assignments.component';
import { ReportsComponent } from './pages/principal/reports/reports.component';
import { FeesComponent } from './pages/principal/fees/fees.component';
import { SalariesComponent } from './pages/principal/salaries/salaries.component';
import { NewsComponent } from './pages/principal/news/news.component';
import { ChatsComponent } from './pages/principal/chats/chats.component';
import { AddClassComponent } from './pages/principal/add-class/add-class.component';
import { ApplicationsComponent } from './pages/principal/applications/applications.component';
import { TeacherDashboardComponent } from './pages/teacher/teacher-dashboard/teacher-dashboard.component';
import { ClerkDashboardComponent } from './pages/clerk/clerk-dashboard/clerk-dashboard.component';
import { TeacherComponent } from './pages/teacher/teacher/teacher.component';
import { ClerkComponent } from './pages/clerk/clerk/clerk.component';
import { TeacherSidebarComponent } from './pages/teacher/teacher-sidebar/teacher-sidebar.component';
import { EditClassComponent } from './pages/principal/edit-class/edit-class.component';
import { AddSubjectComponent } from './pages/principal/add-subject/add-subject.component';
import { EditSubjectComponent } from './pages/principal/edit-subject/edit-subject.component';
import { ClerkSidebarComponent } from './pages/clerk/clerk-sidebar/clerk-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    LogoComponent,
    AlertComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    RegisteredAccountComponent,
    ActivateAccountComponent,
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
    AddClassComponent,
    ApplicationsComponent,
    TeacherDashboardComponent,
    ClerkDashboardComponent,
    TeacherComponent,
    ClerkComponent,
    TeacherSidebarComponent,
    EditClassComponent,
    AddSubjectComponent,
    EditSubjectComponent,
    ClerkSidebarComponent,
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
