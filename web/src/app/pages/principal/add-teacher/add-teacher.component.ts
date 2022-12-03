import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html'
})
export class AddTeacherComponent implements OnInit {
  openForm: string = 'add'; // add or verify
 
  constructor() { }

  ngOnInit(): void {
  }

  onBack(): void {
    window.history.back();
  }

  onSubmitAdd(): void {
    this.openForm = 'verify';
  }

  onSubmitVerify(): void {
    this.openForm = 'add';
  }

  cancel(): void {
    this.openForm = 'add';
  }

}
