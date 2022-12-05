import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
})
export class SubjectsComponent implements OnInit {
  modelTitle: string = "Title";
  modelMsg: string = "Message";
  isModelHidden: string = "hidden";
  isAlertHidden: boolean = true;
  alertMessage: string = "This is an alert message";
  alertType: string = "success";
  subjects: any = [];

  constructor() { }

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects = async () => {
    const data = await fetch(`${environment.API_URL}/api/subject/getAllSubjects`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${localStorage.getItem("GFS-AUTH-TOKEN")}`
      }
    });
    const res = await data.json();
    if (res.success) {
      this.subjects = res.subjects;
    }
  }

  deleteSubject = async (name: string) => {
    if (confirm("Are you sure you want to delete this subject?")) {
      const data = await fetch(`${environment.API_URL}/api/subject/deleteSubject`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("GFS-AUTH-TOKEN")}`
        },
        body: JSON.stringify({
          name
        })
      });
      const res = await data.json();
      if (res.success) {
        this.getSubjects();
        this.alertMessage = "Subject deleted successfully";
        this.alertType = "success";
        this.isAlertHidden = false;
      }
      else {
        this.isAlertHidden = false;
        this.alertMessage = res.msg;
        this.alertType = "danger";
      }
    }
  }


  handleViewClick = (name: string, msg: string) => {
    this.modelTitle = "Description of " + name;
    this.modelMsg = msg;
    this.isModelHidden = "";
  }

  closeModel = () => {
    this.isModelHidden = "hidden";
  }

  handleAlertClose($event: boolean) {
    this.isAlertHidden = $event;
  }

  getDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  }

  handleEditClick = (id: string) => {
    window.location.href = `/edit?id=${id}`;
  }

}
