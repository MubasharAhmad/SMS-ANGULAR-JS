import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ActivateAccountComponent } from './pages/auth/activate-account/activate-account.component';
import { RegisteredAccountComponent } from './pages/auth/registered-account/registered-account.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './pages/auth/change-password/change-password.component';

import { PrincipalComponent } from './pages/principal/principal/principal.component';
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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'registeredaccount', component: RegisteredAccountComponent },
  { path: 'activateaccount', component: ActivateAccountComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
  {
    path: 'principal', component: PrincipalComponent,
    children: [
      { path: '', component: PrincipalDashboardComponent, pathMatch: 'full' },
      { path: 'dashboard', component: PrincipalDashboardComponent, pathMatch: 'full' },
      { path: 'classes', component: ClassesComponent, pathMatch: 'full' },
      { path: 'addclass', component: AddClassComponent, pathMatch: 'full' },
      { path: 'subjects', component: SubjectsComponent, pathMatch: 'full' },
      { path: 'teachers', component: TeachersComponent, pathMatch: 'full' },
      { path: 'clerks', component: ClerksComponent, pathMatch: 'full' },
      { path: 'timetable', component: TimetableComponent, pathMatch: 'full' },
      { path: 'attendances', component: AttendancesComponent, pathMatch: 'full' },
      { path: 'assignments', component: AssignmentsComponent, pathMatch: 'full' },
      { path: 'Reports', component: ReportsComponent, pathMatch: 'full' },
      { path: 'fees', component: FeesComponent, pathMatch: 'full' },
      { path: 'salaries', component: SalariesComponent, pathMatch: 'full' },
      { path: 'news', component: NewsComponent, pathMatch: 'full' },
      { path: 'chats', component: ChatsComponent, pathMatch: 'full' },
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
