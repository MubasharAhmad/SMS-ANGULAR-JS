import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-varify-account',
  templateUrl: './varify-account.component.html'
})
export class VarifyAccountComponent implements OnInit {

  isAlertHidden: boolean = true;
  alertMessage: string = "";
  alertType: string = "success";

  varificationCode: string = "";
  isVarifing: boolean = false;

  constructor() { }

  ngOnInit(): void {
    const email = localStorage.getItem("email");
    if (email === null) {
      location.pathname = "/register";
    }
  }

  async onSubmit() {
    const email = localStorage.getItem("email");
    if (email === null) {
      location.pathname = "/register";
    }
    else {
      if (this.varificationCode === "") {
        this.alertMessage = "Varification code is required";
        this.alertType = "danger";
        this.isAlertHidden = false;
      }
      else {
        this.isVarifing = true;
        const response = await fetch(`${environment.API_URL}/api/auth/varify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            code: this.varificationCode
          })
        });
        const data = await response.json();
        if (data.success) {
          this.alertMessage = "Account varified successfully";
          this.alertType = "success";
          this.isAlertHidden = false;
          localStorage.removeItem("email");
          location.pathname = "/registeredaccount";
        }
        else {
          this.alertMessage = data.msg;
          this.alertType = "danger";
          this.isAlertHidden = false;
        }
        this.isVarifing = false;
      }
    }
  }

  async resendVarificationCode() {
    const email = localStorage.getItem("email");
    if (email) {
      const response = await fetch(`${environment.API_URL}/api/auth/varificationEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          purpose: "SignUp"
        })
      });
      const data = await response.json();
      if (data.success) {
        this.alertMessage = data.msg;
        this.alertType = "success";
        this.isAlertHidden = false;
      }
      else {
        this.alertMessage = data.msg;
        this.alertType = "danger";
        this.isAlertHidden = false;
      }
    }
    else{
      location.pathname = "/register";
    }
  }

  handleClose($event: boolean) {
    this.isAlertHidden = $event;
  }
}
