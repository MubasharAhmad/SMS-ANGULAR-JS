import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendances',
  templateUrl: './attendances.component.html',
})
export class AttendancesComponent implements OnInit {
  attendances: any = [
    {
      presents: 20,
      absences: 10,
      leaves: 5,
      total: 35,
      date: '2020-01-01',
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
