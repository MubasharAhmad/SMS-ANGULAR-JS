import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html'
})
export class ApplicationsComponent implements OnInit {
  applications: any = [];
  counter: number = 0;

  isAlertHidden: boolean = true;
  alertMessage: string = "";
  alertType:string = "primary";
  
  modelTitle: string = "Title1";
  modelMsg: string = "Message1";
  isModelHidden: string = "hidden";

  constructor() { }

  ngOnInit(): void {
    this.getApplications();
  }

  getApplications = async () => {
    const data = await fetch(`${environment.API_URL}/api/principal/getallUsers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${localStorage.getItem('GFS-AUTH-TOKEN')}`
      }
    });
    const applications = await data.json();
    this.applications = applications.users;
  }

  getDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  }

  getCounter = () => {
    this.counter++;
    return this.counter;
  }

  acceptApplication = async (email: string) => {
    // confirm if yes or no
    if (confirm('Are you sure you want to accept this application?')) {
      const data = await fetch(`${environment.API_URL}/api/principal/acceptApplication`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('GFS-AUTH-TOKEN')}`
        },
        body: JSON.stringify({
          email
        })
      });
      const res = await data.json();
      if (res.success) {
        this.getApplications();
        this.alertMessage = res.msg;
        this.alertType = 'success';
        this.isAlertHidden = false;
      }
      else {
        this.alertMessage = res.msg;
        this.alertType = 'danger';
        this.isAlertHidden = false;
      }
    }
  }

  regectApplication = async (email: string) => {
    // confirm if yes or no
    if (confirm('Are you sure you want to reject this application?')) {
      const data = await fetch(`${environment.API_URL}/api/principal/rejectApplication`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': `${localStorage.getItem('GFS-AUTH-TOKEN')}`
        },
        body: JSON.stringify({
          email
        })
      });
      const res = await data.json();
      if (res.success) {
        this.getApplications();
        this.alertMessage = res.msg;
        this.alertType = 'success';
        this.isAlertHidden = false;
      }
      else {
        this.alertMessage = res.msg;
        this.alertType = 'danger';
        this.isAlertHidden = false;
      }
    }
  }

  handleViewClick = (email: string, msg: string) => {
    this.modelTitle = "Description of " + email;
    this.modelMsg = msg;
    this.isModelHidden = "";
  }

  closeModel = () => {
    this.isModelHidden = "hidden";
  }

  handleAlertClose($event: boolean) {
    this.isAlertHidden = $event;
  }

}
