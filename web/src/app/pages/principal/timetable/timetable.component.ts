import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
})
export class TimetableComponent implements OnInit {
  classes: any = [];
  selectedClass: string = "";
  timeTable: any = [{
    time: "8:00 - 8:45 PM",
    monday: "English",
    tuesday: "English",
    wednesday: "English",
    thursday: "English",
    friday: "English",
    saturday: "English",
    sunday: ""
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
