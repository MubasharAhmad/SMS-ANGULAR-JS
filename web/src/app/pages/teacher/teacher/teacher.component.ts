import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html'
})
export class TeacherComponent implements OnInit {

  heading: string = "Dashboard";
  sideBarHide: string = 'hidden';
  constructor() { }

  ngOnInit(): void {
  }

  changeHeading(heading: string) {
    this.heading = heading;
  }

  togglSideBar(h: string) {
    this.sideBarHide = h;
  }
}
