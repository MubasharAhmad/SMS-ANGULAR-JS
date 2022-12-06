import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html'
})
export class AddClassComponent implements OnInit {
  teachers: any = [];
  subjects: any = [];
  addedSubjects: any = [];

  isAlertHidden: boolean = true;
  alertMessage: string = "Registration Successful";
  alertType: string = "primary";

  name: string = "";
  nameError: string = "";
  fee: number = 0;
  feeError: string = "";
  description: string = "";
  descriptionError: string = "";

  teacher: string = "";
  subject: string = "";

  constructor() { }

  ngOnInit(): void {
    this.getAllSubjects();
    this.getAllTeachers();
  }

  getAllSubjects = async () => {
    const response = await fetch(`${environment.API_URL}/api/subject/getAllSubjects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${localStorage.getItem('GFS-AUTH-TOKEN')}`
      }
    });
    const data = await response.json();
    for (let i = 0; i < data.subjects.length; i++) {
      const element = data.subjects[i];
      this.subjects.push(element.name);
    }
  };

  getAllTeachers = async () => {
    const response = await fetch(`${environment.API_URL}/api/teacher/getAllTeachers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${localStorage.getItem('GFS-AUTH-TOKEN')}`
      }
    });
    const data = await response.json();
    this.teachers = data.teachers;
  };

  onBack(): void {
    // TODO: Navigate to the previous page
    window.history.back();
  }

  addSubject(): void {
    if (this.teacher === "" || this.subject === "") {
      return;
    }
    this.addedSubjects.push({
      teacher: this.teacher,
      subject: this.subject
    });
    this.subjects = this.subjects.filter((s: any) => s !== this.subject);
    this.teacher = "";
    this.subject = "";
  }

  removeSubject(subject: any): void {
    this.addedSubjects = this.addedSubjects.filter((s: any) => s.subject !== subject);
    this.subjects.push(subject);
  }

  onSubmit = async () => {
    if (this.name === "" ){
      this.nameError = "Name is required";
    }
    else if (this.name.length < 3) {
      this.nameError = "Name must be at least 3 characters";
    }
    else {
      this.nameError = "";
    }

    if (this.fee === 0 || this.fee < 0) {
      this.feeError = "Fee must be greater than 0";
    }
    else {
      this.feeError = "";
    }

    if (this.description === "") {
      this.descriptionError = "Description is required";
    }
    else if (this.description.length < 10) {
      this.descriptionError = "Description must be at least 10 characters";
    }
    else {
      this.descriptionError = "";
    }

    if (this.nameError === "" && this.feeError === "" && this.descriptionError === "") {
      const response = await fetch(`${environment.API_URL}/api/class/addClass`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('GFS-AUTH-TOKEN')}`
        },
        body: JSON.stringify({
          name: this.name,
          fee: this.fee,
          description: this.description,
          addedSubjects: this.addedSubjects
        })
      });
      const data = await response.json();
      if (data.success) {
        this.isAlertHidden = false;
        this.alertMessage = "Class added successfully";
        this.alertType = "success";
      }
      else {
        this.isAlertHidden = false;
        this.alertMessage = data.msg;
        this.alertType = "danger";
      }
    }
  }

  handleClose($event: boolean) {
    this.isAlertHidden = $event;
  }
}