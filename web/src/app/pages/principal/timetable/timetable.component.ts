import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
})
export class TimetableComponent implements OnInit {
  classes: any = ["9th"];
  selectedClass: string = "Pth";
  timeTable: any = [{
    periodNo: "1",
    monday: ["English","10:00 pm","11:00 pm"],
    tuesday: ["English","10:00 pm","11:00 pm"],
    wednesday: ["English","10:00 pm","11:00 pm"],
    thursday: ["English","10:00 pm","11:00 pm"],
    friday: ["English","10:00 pm","11:00 pm"],
    saturday: null,
    sunday: null
  }];

  constructor() { }

  ngOnInit(): void {
  }

}
