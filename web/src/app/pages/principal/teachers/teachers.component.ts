import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
})
export class TeachersComponent implements OnInit {
  teachers: any = [];

  constructor() { }

  ngOnInit(): void {
  }

  
}
