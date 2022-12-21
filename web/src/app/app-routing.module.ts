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
import { ApplicationsComponent } from './pages/principal/applications/applications.component';
import { TeacherComponent } from './pages/teacher/teacher/teacher.component';
import { TeacherDashboardComponent } from './pages/teacher/teacher-dashboard/teacher-dashboard.component';
import { EditClassComponent } from './pages/principal/edit-class/edit-class.component';
import { AddSubjectComponent } from './pages/principal/add-subject/add-subject.component';
import { EditSubjectComponent } from './pages/principal/edit-subject/edit-subject.component';
import { ClerkComponent } from './pages/clerk/clerk/clerk.component';
import { ClerkDashboardComponent } from './pages/clerk/clerk-dashboard/clerk-dashboard.component';
import { AddTeacherComponent } from './pages/principal/add-teacher/add-teacher.component';
import { EditTeacherComponent } from './pages/principal/edit-teacher/edit-teacher.component';
import { AddClerkComponent } from './pages/principal/add-clerk/add-clerk.component';
import { EditClerkComponent } from './pages/principal/edit-clerk/edit-clerk.component';
import { AddTimetableComponent } from './pages/principal/add-timetable/add-timetable.component';
import { StudentsComponent } from './pages/principal/students/students.component';
import { AddStudentComponent } from './pages/principal/add-student/add-student.component';
import { AddAttendanceComponent } from './pages/principal/add-attendance/add-attendance.component';
import { EditAttendanceComponent } from './pages/principal/edit-attendance/edit-attendance.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'forgotpassword', component: ForgotPasswordComponent, pathMatch: 'full' },
  { path: 'changepassword', component: ChangePasswordComponent, pathMatch: 'full' },
  { path: 'activateaccount', component: ActivateAccountComponent },
  { path: 'registeredaccount', component: RegisteredAccountComponent },
  {
    path: 'principal', component: PrincipalComponent,
    children: [
      { path: '', component: PrincipalDashboardComponent, pathMatch: 'full' },
      { path: 'dashboard', component: PrincipalDashboardComponent, pathMatch: 'full' },
      {
        path: 'classes',
        children: [
          { path: '', component: ClassesComponent, pathMatch: 'full' },
          { path: 'add', component: AddClassComponent, pathMatch: 'full' },
          { path: 'edit/:id', component: EditClassComponent, pathMatch: 'full' }
        ]
      },
      {
        path: 'subjects',
        children: [
          { path: '', component: SubjectsComponent, pathMatch: 'full' },
          { path: 'add', component: AddSubjectComponent, pathMatch: 'full' },
          { path: 'edit/:id', component: EditSubjectComponent, pathMatch: 'full' }
        ]
      },
      {
        path: 'teachers',
        children: [
          { path: '', component: TeachersComponent, pathMatch: 'full' },
          { path: 'add', component: AddTeacherComponent, pathMatch: 'full' },
          { path: 'edit', component: EditTeacherComponent, pathMatch: 'full' }
        ]
      },
      {
        path: 'clerks',
        children: [
          { path: '', component: ClerksComponent, pathMatch: 'full' },
          { path: 'add', component: AddClerkComponent, pathMatch: 'full' },
          { path: 'edit', component: EditClerkComponent, pathMatch: 'full' }
        ]
      },
      {
        path: 'students',
        children: [
          { path: '', component: StudentsComponent, pathMatch: 'full' },
          { path: 'add', component: AddStudentComponent, pathMatch: 'full' },
          { path: 'edit', component: EditSubjectComponent, pathMatch: 'full' }
        ]
      },
      {
        path: 'timetable',
        children: [
          { path: '', component: TimetableComponent, pathMatch: 'full' },
          { path: 'add', component: AddTimetableComponent, pathMatch: 'full' },
          { path: 'edit', component: EditClassComponent, pathMatch: 'full' }
        ]
      },
      {
        path: 'attendances',
        children: [
          { path: '', component: AttendancesComponent, pathMatch: 'full' },
          { path: 'add', component: AddAttendanceComponent, pathMatch: 'full' },
          { path: 'edit', component: EditAttendanceComponent, pathMatch: 'full' }
        ]
      },
      { path: 'assignments', component: AssignmentsComponent, pathMatch: 'full' },
      { path: 'reports', component: ReportsComponent, pathMatch: 'full' },
      { path: 'fees', component: FeesComponent, pathMatch: 'full' },
      { path: 'salaries', component: SalariesComponent, pathMatch: 'full' },
      { path: 'news', component: NewsComponent, pathMatch: 'full' },
      { path: 'chats', component: ChatsComponent, pathMatch: 'full' },
      { path: 'applications', component: ApplicationsComponent, pathMatch: 'full' },
      // if other then redirect
      { path: '**', redirectTo: 'dashboard' }
    ]
  },
  {
    path: 'teacher', component: TeacherComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: TeacherDashboardComponent, pathMatch: 'full' },
      // if other then redirect
      { path: '**', redirectTo: 'dashboard' }
    ]
  },
  {
    path: 'clerk', component: ClerkComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ClerkDashboardComponent, pathMatch: 'full' },
      // if other then redirect
      { path: '**', redirectTo: 'dashboard' }
    ]
  },
  // if other then redirect
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
