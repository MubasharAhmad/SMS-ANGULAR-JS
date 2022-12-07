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
    this.nameError = "";
    this.fatherNameError = "";
    this.occupationError = "";
    this.phoneError = "";
    this.selectedClassError = "";
    this.rollNoError = "";
    this.addressError = "";
    if (this.name == "") {
      this.nameError = "Name is required";
    }
    if (this.fatherName == "") {
      this.fatherNameError = "Father Name is required";
    }
    if (this.occupation == "") {
      this.occupationError = "Occupation is required";
    }
    if (this.phone == "") {
      this.phoneError = "Phone is required";
    }
    if (this.selectedClass == "") {
      this.selectedClassError = "Class is required";
    }
    if (this.rollNo == "") {
      this.rollNoError = "Roll No is required";
    }
    if (this.address == "") {
      this.addressError = "Address is required";
    }
    if (this.name != "" && this.fatherName != "" && this.occupation != "" && this.phone != "" && this.selectedClass != "" && this.rollNo != "" && this.address != "") {
      console.log("Submitted");
    }
  }
}
