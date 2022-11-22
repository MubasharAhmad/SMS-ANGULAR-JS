import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html'
})
export class ApplicationsComponent implements OnInit {
  applications: any = [];

  constructor() { }

  ngOnInit(): void {
    this.applications = [
      {
        no: 1,
        name: 'Application 1',
        email: "arrll@gmail.com",
        role: "Teacher",
        description: 'Description 1',
        date: '2020-01-01'
      },
      {
        no: 2,
        name: 'Application 2',
        email: "arrll@gmail.com",
        role: "Teacher",
        description: 'Description 2',
        date: '2020-01-01'
      }
    ];
  }
}
