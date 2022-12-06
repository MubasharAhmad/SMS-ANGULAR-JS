import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-timetable',
  templateUrl: './add-timetable.component.html'
})
export class AddTimetableComponent implements OnInit {
  classes: any = [];
  subjects: any = [];
  teachers: any = [];
  timeTable: any = [];

  constructor() { }

  ngOnInit(): void {
  }

  onBack(): void {
    window.history.back();
  }

  onSubmit(): void {
  }
}
