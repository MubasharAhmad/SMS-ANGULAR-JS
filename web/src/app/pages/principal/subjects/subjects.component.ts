import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
})
export class SubjectsComponent implements OnInit {
  subjects: any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
