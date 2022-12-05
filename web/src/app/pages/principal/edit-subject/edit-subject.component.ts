import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html'
})
export class EditSubjectComponent implements OnInit {

  subjectName: string = "";
  subjectDesc: string = "";
  subjectId: string = "";
  subjectNameError: string = "";
  subjectDescError: string = "";
  isAlertHidden: boolean = true;
  alertMessage: string = "message";
  alertType: string = "success";
  constructor() { }

  ngOnInit(): void {
    // get subject id from url
    this.subjectId = window.location.href.split("/")[window.location.href.split("/").length - 1];
    // get subject data from server
    this.getSubject();
  }

  getSubject = async () => {
    const response = await fetch(`${environment.API_URL}/api/subject/getSubject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${localStorage.getItem('GFS-AUTH-TOKEN')}`
      },
      body: JSON.stringify({
        id: this.subjectId
      })
    });
    const data = await response.json();
    if (data.success) {
      this.subjectName = data.subject.name;
      this.subjectDesc = data.subject.description;
    } else {
      this.onBack();
    }
  }


  onBack(): void {
    // TODO: Navigate to the previous page
    window.history.back();
  }

  onSubmit = async () => {
    if (this.subjectName === "") {
      this.subjectNameError = "Name is required";
    }
    else if (this.subjectName.length < 3) {
      this.subjectNameError = "Subject name must be atleast 3 characters long";
    }
    else {
      this.subjectNameError = "";
    }

    if (this.subjectDesc === "") {
      this.subjectDescError = "Subject description is required";
    }
    else if (this.subjectDesc.length < 10) {
      this.subjectDescError = "Subject description must be atleast 10 characters long";
    }
    else {
      this.subjectDescError = "";
    }

    if (this.subjectNameError === "" && this.subjectDescError === "") {
      const data = await fetch(`${environment.API_URL}/api/subject/updateSubject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("GFS-AUTH-TOKEN")}`
        },
        body: JSON.stringify({
          id: this.subjectId,
          name: this.subjectName,
          description: this.subjectDesc
        })
      });
      const res = await data.json();
      if (res.success) {
        this.alertMessage = "Subject updated successfully";
        this.alertType = "success";
        this.isAlertHidden = false;
        this.subjectName = "";
        this.subjectDesc = "";
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
