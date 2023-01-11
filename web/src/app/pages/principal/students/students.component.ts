import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

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
  selectedClass: any = {};
  students: any = [];

  constructor() { }

  ngOnInit(): void {
    this.getAllClasses();
  }

  handleViewClick = (name: string, msg: string) => {
    this.modelTitle = "Description of " + name;
    this.modelMsg = msg;
    this.isModelHidden = "";
  }

  getAllClasses = async () => {
    const response = await fetch(`${environment.API_URL}/api/class/getClasses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${localStorage.getItem('GFS-AUTH-TOKEN')}`
      }
    });
    const data = await response.json();
    if (data.success) {
      console.log(data._classes);
      this.classes = data._classes;

      if (this.classes.length > 0) {
        this.selectedClass = this.classes[0];
        this.getAllStudents();
      }
    }
  };

  getAllStudents = async () => {
    const response = await fetch(`${environment.API_URL}/api/student/getAllStudents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${localStorage.getItem('GFS-AUTH-TOKEN')}`
      },
      body: JSON.stringify({
        classId: this.selectedClass._id,
      })
    });
    const data = await response.json();
    if (data.success) {
      this.students = data.students;
    }
  };


  closeModel = () => {
    this.isModelHidden = "hidden";
  }

  deleteSubject = async (name: string) => {
    if (confirm("Are you sure you want to delete this subject?")) {

    }
  }
}
