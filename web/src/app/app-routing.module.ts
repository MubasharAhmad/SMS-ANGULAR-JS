import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { VarifyAccountComponent } from './Components/varify-account/varify-account.component';
import { RegisteredAccountComponent } from './Components/registered-account/registered-account.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { PrincipalComponent } from './Components/principal/principal.component';
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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'varifyaccount', component: VarifyAccountComponent },
  { path: 'registeredaccount', component: RegisteredAccountComponent },
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'resetpassword', component: ResetPasswordComponent, pathMatch: 'full' },
  { path: 'changepassword', component: ChangePasswordComponent, pathMatch: 'full' },
  {
    path: 'principal', component: PrincipalComponent,
    children: [
      { path: '', component: PrincipalDashboardComponent, pathMatch: 'full' },
      { path: 'dashboard', component: PrincipalDashboardComponent, pathMatch: 'full' },
      { path: 'classes', component: ClassesComponent, pathMatch: 'full' },
      { path: 'subjects', component: SubjectsComponent, pathMatch: 'full' },
      { path: 'teachers', component: TeachersComponent, pathMatch: 'full' },
      { path: 'clerks', component: ClerksComponent, pathMatch: 'full' },
      { path: 'timetable', component: TimetableComponent, pathMatch: 'full' },
      { path: 'attendances', component: AttendancesComponent, pathMatch: 'full' },
      { path: 'assignments', component: AssignmentsComponent, pathMatch: 'full' },
      { path: 'Reports', component: ReportsComponent, pathMatch: 'full' },
      { path: 'fees', component: FeesComponent , pathMatch: 'full' },
      { path: 'salaries', component: SalariesComponent , pathMatch: 'full' },
      { path: 'news', component: NewsComponent , pathMatch: 'full' },
      { path: 'chats', component: ChatsComponent , pathMatch: 'full' },
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
