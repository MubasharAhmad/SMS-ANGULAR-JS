import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html'
})
export class AddTeacherComponent implements OnInit {
  name: any = "";
  nameError: any = "";
  email: any = "";
  emailError: any = "";
  description: any = "";
  descriptionError: any = "";
  isAlertHidden: boolean = true;
  alertMessage: string = "message";
  alertType: string = "success";
  constructor() { }

  ngOnInit(): void {
  }

  onBack(): void {
    window.history.back();
  }

  onSubmit = async () => {
    this.nameError = "";
    this.emailError = "";
    this.descriptionError = "";
    if (this.name == "") {
      this.nameError = "Name is required";
    }
    if (this.email == "") {
      this.emailError = "Email is required";
    }
    if (this.description == "") {
      this.descriptionError = "Description is required";
    }
    if (this.name != "" && this.email != "" && this.description != "") {
      const data = await fetch(`${environment.API_URL}/api/teacher/addTeacher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("GFS-AUTH-TOKEN")}`
        },
        body: JSON.stringify({
          teacherName: this.name,
          teacherEmail: this.email,
          teacherDescription: this.description
        })
      });
      const res = await data.json();
      if (res.success){
        this.alertMessage = res.msg;
        this.alertType = "success";
        this.isAlertHidden = false;
        this.name = "";
        this.email = "";
        this.description = "";
        this.nameError = "";
        this.emailError = "";
        this.descriptionError = "";
        setTimeout(() => {
          this.onBack();
        }, 1000);
      }
      else {
        this.alertMessage = res.msg;
        this.alertType = "danger";
        this.isAlertHidden = false;
      }
    }
  }
  handleAlertClose($event: boolean) {
    this.isAlertHidden = $event;
  }
}
