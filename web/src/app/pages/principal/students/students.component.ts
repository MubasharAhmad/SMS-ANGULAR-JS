import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html'
})
export class StudentsComponent implements OnInit {
  modelTitle: string = "Title";
  modelMsg: string = "Message";
  isModelHidden: string = "hidden";
  isAlertHidden: boolean = true;
  alertMessage: string = "This is an alert message";
  alertType: string = "success";
  
  classes: any = [];
  selectedClass: string = "";
  students: any = [];

  constructor() { }

  ngOnInit(): void {
  }

  handleViewClick = (name: string, msg: string) => {
    this.modelTitle = "Description of " + name;
    this.modelMsg = msg;
    this.isModelHidden = "";
  }

  closeModel = () => {
    this.isModelHidden = "hidden";
  }

  deleteSubject = async (name: string) => {
    if (confirm("Are you sure you want to delete this subject?")) {

    }
  }
}
