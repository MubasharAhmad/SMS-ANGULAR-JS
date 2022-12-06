import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
})
export class PrincipalComponent implements OnInit {

  heading: string = "Dashboard";
  sideBarHide: string = 'hidden';
  constructor() { }

  ngOnInit(): void {
    let pathnames = window.location.pathname.split('/');
    if (pathnames.length > 2) {
      if (pathnames[2] === "dashboard") {
        this.heading = "Dashboard";
      }
      else if (pathnames[2] === "classes") {
        this.heading = "Classes";
      }
      else if (pathnames[2] === "subjects") {
        this.heading = "Subjects";
      }
      else if (pathnames[2] === "teachers") {
        this.heading = "Teachers";
      }
      else if (pathnames[2] === "students") {
        this.heading = "Students";
      }
      else if (pathnames[2] === "clerks") {
        this.heading = "Clerks";
      }
      else if (pathnames[2] === "timetable") {
        this.heading = "Time Table";
      }
      else if (pathnames[2] === "attendances") {
        this.heading = "Attendances";
      }
      else if (pathnames[2] === "assignments") {
        this.heading = "Assignments";
      }
      else if (pathnames[2] === "reports") {
        this.heading = "Reports";
      }
      else if (pathnames[2] === "fees") {
        this.heading = "Fees";
      }
      else if (pathnames[2] === "salaries") {
        this.heading = "Salaries";
      }
      else if (pathnames[2] === "news") {
        this.heading = "News";
      }
      else if (pathnames[2] === "chats") {
        this.heading = "Chats";
      }
      else if (pathnames[2] === "applications") {
        this.heading = "Applications";
      }
    }
  }

  changeHeading(heading: string) {
    this.heading = heading;
  }

  togglSideBar(h: string) {
    this.sideBarHide = h;
  }

}
