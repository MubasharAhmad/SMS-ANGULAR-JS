import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html'
})
export class AddStudentComponent implements OnInit {
  name: string = "";
  nameError: string = "";
  fatherName: string = "";
  fatherNameError: string = "";
  occupation: string = "";
  occupationError: string = "";
  phone: string = "";
  phoneError: string = "";
  selectedClass: string = "";
  selectedClassError: string = "";
  rollNo: string = "";
  rollNoError: string = "";
  address: string = "";
  addressError: string = "";

  classes: any = [];

  constructor() { }

  ngOnInit(): void {
  }

  onBack(): void {
    // TODO: Navigate to the previous page
    window.history.back();
  }

  onSubmit(): void {
    
  }
}
